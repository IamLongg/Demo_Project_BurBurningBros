import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { Input, Table, TableProps } from 'antd'

export interface Product {
  id: number
  title: string
  price: string
  images: Array<string>
}

function App() {
  const [products, setProducts] = useState([])
  const [searchProduct, setSearchProduct] = useState<string | number>('')

  const fectchData = async () => {
    const res = await axios.get(`https://dummyjson.com/products?limit=0`)
    const data = res ? res.data.products : []
    setProducts(data)
  }
  useEffect(() => {
    fectchData()
  }, [])

  const columns: TableProps<Product>['columns'] = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: 'Images',
      dataIndex: 'images',
      key: 'images',
      render: (_, { images }) => (
        <>
          {images.map((img) => (
            <img src={img} width={'30%'} height={'30%'} />
          ))}
        </>
      )
    }
  ]

  const onSearch = (value: string) => {
    const filterData = products.filter((o) =>
      Object.keys(o).some((k) => String(o[k]).toLowerCase().includes(value.toLowerCase()))
    )
    setSearchProduct(filterData as any)
  }

  return (
    <>
      <Input.Search placeholder='Search here...' style={{ marginBottom: '30px' }} onSearch={onSearch} />

      <Table<Product>
        columns={columns}
        dataSource={(searchProduct ? searchProduct : products) as Array<Product>}
        pagination={false}
        scroll={{ y: 600 }}
      />
    </>
  )
}

export default App
