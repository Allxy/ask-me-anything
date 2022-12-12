import classNames from 'classnames';
import './Avatar.css';

interface AvatarProps {
  className?: string
  src: string
}

const Avatar: React.FC<AvatarProps> = ({ className, src }) => {
  return (
    <div className={classNames('avatar', className)}>
      <img className="avatar__image" src={src} alt="Avatar"/>
    </div>
  );
};

export default Avatar;
