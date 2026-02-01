'use client'

import { useState } from 'react'

const EditForm = ({ product }) => {
    const [formData, setFormData] = useState({
        name: product?.name ?? '',
        description: product?.description || '',
        colors: product?.colors || ['#000000'],
        type: product?.type || 'man',
        subtype: product?.subtype || 'top',
        price: product?.price || '',
    })

    return (
        <form>
            <h2>Hello World</h2>
            <input type="text" name="name" value={formData?.name} />
        </form>
    )
}
export default EditForm
