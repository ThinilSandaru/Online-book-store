import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Loader2, BookOpen } from 'lucide-react';
import { API_URL } from '../../services/api';

interface AuthenticatedImageProps {
    src: string;
    alt: string;
    className?: string;
}

const AuthenticatedImage: React.FC<AuthenticatedImageProps> = ({ src, alt, className }) => {
    const { token } = useAuth();
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const fetchImage = async () => {
            if (!src) {
                setIsLoading(false);
                return;
            }

            // Ensure we have a full URL if it's relative
            const fullUrl = src.startsWith('http') || src.startsWith('data:')
                ? src
                : `${API_URL}${src.startsWith('/') ? '' : '/'}${src}`;

            if (!token) {
                // If no token, just try to load as a regular image
                setImageSrc(fullUrl);
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                setError(false);
                const response = await fetch(fullUrl, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    // If fetch fails (maybe 401 or 403 or CORS), try to load as a regular image
                    // as a fallback in case the image is actually public
                    console.warn('Authenticated fetch failed, falling back to public URL');
                    setImageSrc(fullUrl);
                    setIsLoading(false);
                    return;
                }

                const blob = await response.blob();
                const objectUrl = URL.createObjectURL(blob);
                setImageSrc(objectUrl);
            } catch (err) {
                console.error('Error fetching authenticated image:', err);
                // Fallback to regular image tag
                setImageSrc(fullUrl);
            } finally {
                setIsLoading(false);
            }
        };

        fetchImage();

        // Cleanup function to avoid memory leaks
        return () => {
            if (imageSrc && imageSrc.startsWith('blob:')) {
                URL.revokeObjectURL(imageSrc);
            }
        };
    }, [src, token]);

    if (isLoading) {
        return (
            <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
                <Loader2 size={24} className="text-primary animate-spin" />
            </div>
        );
    }

    if (error || !imageSrc) {
        return (
            <div className={`flex flex-col items-center justify-center bg-gray-100 text-gray-400 ${className}`}>
                <BookOpen size={32} />
                <span className="text-[10px] mt-1">Error</span>
            </div>
        );
    }

    return (
        <img
            src={imageSrc}
            alt={alt}
            className={className}
            onError={() => setError(true)}
        />
    );
};

export default AuthenticatedImage;
