import { request } from '../utils/https-client';

const getProducts = () => {
  const url = 'products';
  return request(url, 'get').then((response) => {
    const products = response.data;
    return products.map((product) => {
      return {
        id: product.id,
        application_id: product.application_id,
        product_type_id: product.product_type_id,
        user: product.user_id,
        number: product.number,
        amount: product.amount,
        cvv: product.cvv,
        expire_year: product.expire_year,
        expire_month: product.expire_month,
      }
    })
  })
  .catch((error) => {
    console.error('Error getProducts: ', error);
    throw error; 
  });
};

const getProductById = (productId) => {
  const url = `products/${productId}`;
  return request(url, 'get').then((response) => {
    const product = response.data[0];
    return {
      id: product.id,
      application_id: product.application_id,
      product_type_id: product.product_type_id,
      user: product.user_id,
      number: product.number,
      amount: product.amount,
      cvv: product.cvv,
      expire_year: product.expire_year,
      expire_month: product.expire_month,
    }
  })
  .catch((error) => {
    console.error('Error getProductById: ', error);
    throw error; 
  });
};

const getProductsByUser = (userId) => {
  const url = `/products/users/${userId}`;
  return request(url, 'get').then((response) => {
    const products = response.data;
    return products.map((product) => {
      return {
        id: product.id,
        application_id: product.application_id,
        product_type_id: product.product_type_id,
        user: product.user_id,
        number: product.number,
        amount: product.amount,
        cvv: product.cvv,
        expire_year: product.expire_year,
        expire_month: product.expire_month,
      }
    })
  })
  .catch((error) => {
    console.error('Error getProductsByUser: ', error);
    throw error; 
  });
};

const createProduct = (data) => {
  const url = 'products';
  return request(url, 'post', data).then((response) => {
    console.log('product created:', response.data);
    return response.data;
  })
  .catch((error) => {
    console.error('Error createProduct: ', error);
    throw error;
  });
};

const deleteProduct = (productId) => {
  const url = `products/${productId}`;
  return request(url, 'delete')
    .then((response) => {
      console.log(`product ${productId} deleted.`);
      return response.data;
    })
    .catch((error) => {
      console.error(`Error deleteProduct ${productId}: `, error);
      throw error;
    });
};

const updateProduct = (productId, updateData) => {
  const url = `products/${productId}`;
  return request(url, 'put', updateData)
    .then((response) => {
      console.log(`Product ${productId} updated.`);
      return response.data;
    })
    .catch((error) => {
      console.error(`Error updateProduct ${productId}: `, error);
      throw error;
    });
};

export {
  getProductById,
  getProducts,
  getProductsByUser,
  createProduct,
  updateProduct,
  deleteProduct
};
