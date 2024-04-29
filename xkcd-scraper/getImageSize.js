import { get } from 'https'
import sizeOf from 'image-size'

export const getImageSize = ({url}) =>{
    return new Promise((resolve, reject) => {
        get(url, res => {
            const chunks = []
            res.on('data', chunk => chunks.push(chunk))
            res.on('end', () => {
                const buffer = Buffer.concat(chunks)
                const {height, width} = sizeOf(buffer)
                resolve({height, width})
            })
        }).on('error', reject)
    })

}