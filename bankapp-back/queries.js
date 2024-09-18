// const Pool = require('pg').Pool
// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'postgres',
//   password: 'akp-2420-snk*',
//   port: 5432,
// })


// const getApplications = (request, response) => {
//   pool.query('SELECT * FROM applications ORDER BY id ASC', (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(results.rows)
//   })
// }


// const getApplicationById = (request, response) => {
//   const id = parseInt(request.params.id)

//   pool.query('SELECT * FROM applications WHERE id = $1', [id], (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(results.rows)
//   })
// }


// const getApplicationsByUser = (request, response) => {
//   const user_id = parseInt(request.params.user_id)

//   pool.query('SELECT * FROM applications WHERE user_id = $1', [user_id], (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(results.rows)
//   })
// }

// const createApplication = (request, response) => {
//   const { product_type_id, user_id, admin_user_id, desired_amount} = request.body

//   pool.query('INSERT INTO applications (product_type_id, user_id, admin_user_id, desired_amount) VALUES ($1, $2, $3, $4)', [product_type_id, user_id, admin_user_id, desired_amount], (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(201).send(`Application created with ID: ${results.insertId}`)
//   })
// }


// const updateApplication = (request, response) => {
//   const updated_at = new Date();
//   const id = parseInt(request.params.id)
//   const { product_type_id, admin_user_id, application_status_id, desired_amount } = request.body

//   pool.query(
//     'UPDATE applications SET product_type_id = $1, admin_user_id = $2, application_status_id = $3, desired_amount = $4, updated_at = $5 WHERE id = $6',
//     [product_type_id, admin_user_id, application_status_id, desired_amount, updated_at, id],
//     (error, results) => {
//       if (error) {
//         throw error
//       }
//       response.status(200).send(`Application modified with ID: ${id}`)
//     }
//   )
// }

// const updateProduct = (request, response) => {
//   const id = parseInt(request.params.id)
//   const { amount, expire_year, expire_month} = request.body

//   pool.query(
//     'UPDATE products SET amount = $1, expire_year = $2, expire_month = $3 WHERE id = $4',
//     [amount, expire_year, expire_month, id],
//     (error, results) => {
//       if (error) {
//         throw error
//       }
//       response.status(200).send(`Application modified with ID: ${id}`)
//     }
//   )
// }

// const deleteProduct = (request, response) => {
//   const id = parseInt(request.params.id)

//   pool.query('DELETE FROM products WHERE id = $1', [id], (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).send(`Product deleted with ID: ${id}`)
//   })
// }


// module.exports = {
//   getProducts,
//   getApplications,
//   getProductById,
//   getApplicationById,
//   getProductsByUser,
//   getApplicationsByUser,
//   createApplication,
//   createProduct,
//   updateApplication,
//   updateProduct,
//   deleteProduct,
// }