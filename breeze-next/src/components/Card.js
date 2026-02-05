import Image from 'next/image'

const priceFormat = price => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 2,
    }).format(price)
}

const Card = ({ data }) => {
    return (
        <div className="w-64 h-96 bg-white shadow-lg shadow-gray-300 px-3 py-2 flex flex-col justify-around">
            <figure className="w-full h-56 relative">
                <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${data.images[0].path}`}
                    fill
                    className="object-cover"
                />
            </figure>
            <h3>{data.name}</h3>
            <p className="font-bold">{priceFormat(data.price)}</p>
            <p>{data.description}</p>
        </div>
    )
}
export default Card
