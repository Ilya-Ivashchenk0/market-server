import mongoose from 'mongoose'
import { stringType, urlType } from './mongoTypes'

const itemSchema = new mongoose.Schema({
  userId: stringType({ required: true, ref: 'user' }), // id пользователя создавшего товар
  marketName: stringType({ minLength: 2, maxLength: 30 }), // название магазина
  category: stringType({ minLength: 2, maxLength: 30 }), // категория товара
  name: stringType({ minLength: 2, maxLength: 30 }), // название
  description: stringType({ minLength: 32, maxLength: 256 }), // описание
  price: Number, // цена
  image: urlType, // ссылка на основное фото товара
  images: [{ // ссылки на дополнительные фото
    type: urlType,
    default: {}
  }],
  features: { // характеристики
    specifications: { // технические характеристики
      type: Map, // Характеристики (карта ключ-значение)
      of: stringType({ minLength: 32, maxLength: 256 }) // Значения характеристик
    },
    weightAndSize: { // вес и габариты товара
      weight: Number,
      dimensions: { // Габариты товара
        type: {
          length: Number, // Длина
          width: Number, // Ширина
          height: Number // Высота
        }
      }
    },
    other: {
      brand: stringType({ minLength: 2, maxLength: 30 }), // бренд
      color: stringType({ minLength: 2, maxLength: 30 }), // цвет
      warranty: Number, // гарантия месяцев
      countryOfOrigin: stringType({ minLength: 2, maxLength: 30 }) // страна производитель
    }
  },
  isActive: { type: Boolean, default: true }, // Активность товара
  isFeatured: { type: Boolean, default: false }, // Особый товар
  stockQuantity: { type: Number, default: 0 }, // Количество на складе
  ratings: {
    average: { type: Number, default: 0 }, // Средний рейтинг
    count: { type: Number, default: 0 } // Количество оценок
  }
}, {
  timestamps: true
})

itemSchema.index({ userId: 1 })
itemSchema.index({ name: 1 })
itemSchema.index({ category: 1 })

export default mongoose.model('item', itemSchema)
