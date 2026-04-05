import Image from 'next/image'
import Logo from '../../public/Assets/Logo.png'

const ApplicationLogo = () => (
    <figure className="relative w-72 h-12">
        <Image
            src={Logo ? Logo : ''}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
    </figure>
)

export default ApplicationLogo
