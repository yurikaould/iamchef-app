import { useNavigate } from 'react-router-dom';

interface FloatingActionButtonProps {
  to?: string;
  onClick?: () => void;
  icon?: string;
  ariaLabel?: string;
}

export default function FloatingActionButton({ 
  to = '/feed', 
  onClick, 
  icon = '+',
  ariaLabel = "Go to feed page"
}: FloatingActionButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (to) {
      navigate(to);
    }
  };

  return (
    <button
      className="fab"
      onClick={handleClick}
      aria-label={ariaLabel}
      type="button"
    >
      {icon}
    </button>
  );
}