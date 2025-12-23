import React from 'react';

const ErrorMessage = ({ message, onRetry, onDismiss }) => {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <p className="error-text">{message}</p>
      <div className="error-actions">
        {onRetry && (
          <button onClick={onRetry} className="retry-btn">
            Try Again
          </button>
        )}
        {onDismiss && (
          <button onClick={onDismiss} className="dismiss-btn">
            Dismiss
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;