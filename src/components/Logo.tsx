import logoImg from '../assets/logo.png';

export default function Logo({ size = 120, className = '' }: { size?: number, className?: string }) {
    return (
        <div className={`flex flex-col items-center ${className}`}>
            <img
                src={logoImg}
                alt="Tvam Logo"
                style={{ width: size, height: 'auto', objectFit: 'contain' }}
            />
        </div>
    );
};
