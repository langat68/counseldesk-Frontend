import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
    id: string;
    type: ToastType;
    title: string;
    message?: string;
    duration?: number;
    onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({
    id,
    type,
    title,
    message,
    duration = 5000,
    onClose
}) => {
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(() => {
                handleClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [duration]);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            onClose(id);
        }, 300);
    };

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <CheckCircle size={20} />;
            case 'error':
                return <XCircle size={20} />;
            case 'warning':
                return <AlertCircle size={20} />;
            case 'info':
                return <Info size={20} />;
        }
    };

    return (
        <div
            className={`toast toast-${type} ${isExiting ? 'toast-exit' : ''}`}
            role="alert"
            aria-live="assertive"
        >
            <div className="toast-icon">
                {getIcon()}
            </div>
            <div className="toast-content">
                <h4 className="toast-title">{title}</h4>
                {message && <p className="toast-message">{message}</p>}
            </div>
            <button
                className="toast-close"
                onClick={handleClose}
                aria-label="Close notification"
            >
                <X size={16} />
            </button>
        </div>
    );
};

// Toast Container Component
interface ToastContainerProps {
    toasts: ToastProps[];
    onClose: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onClose }) => {
    return (
        <div className="toast-container">
            {toasts.map((toast) => (
                <Toast key={toast.id} {...toast} onClose={onClose} />
            ))}
        </div>
    );
};

// Hook for managing toasts
export const useToast = () => {
    const [toasts, setToasts] = useState<ToastProps[]>([]);

    const showToast = (
        type: ToastType,
        title: string,
        message?: string,
        duration?: number
    ) => {
        const id = `toast-${Date.now()}-${Math.random()}`;
        const newToast: ToastProps = {
            id,
            type,
            title,
            message,
            duration,
            onClose: removeToast
        };
        setToasts((prev) => [...prev, newToast]);
    };

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    return {
        toasts,
        showToast,
        removeToast,
        success: (title: string, message?: string) => showToast('success', title, message),
        error: (title: string, message?: string) => showToast('error', title, message),
        warning: (title: string, message?: string) => showToast('warning', title, message),
        info: (title: string, message?: string) => showToast('info', title, message)
    };
};

export default Toast;