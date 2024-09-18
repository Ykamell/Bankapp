
import { request } from '../utils/https-client';

const getApplications = () => {
  const url = 'applications';
  return request(url, 'get').then((response) => {
    const applications = response.data;
    return applications.map((application) => {
      return {
        id: application.id,
        product_type_id: application.product_type_id,
        application_status_id: application.application_status_id,
        user: application.user_id,
        admin: application.admin_user_id,
        desired_amount: application.desired_amount,
        created_at: application.created_at,
        updated_at: application.updated_at,
      }
    })
  })
  .catch((error) => {
    console.error('Error getApplications: ', error);
    throw error; 
  });
};

const getApplicationById = (applicationId) => {
  const url = `applications/${applicationId}`;
  return request(url, 'get').then((response) => {
    const application = response.data[0];
    return {
      id: application.id,
      product_type_id: application.product_type_id,
      application_status_id: application.application_status_id,
      user: application.user_id,
      admin: application.admin_user_id,
      desired_amount: application.desired_amount,
      created_at: application.created_at,
      updated_at: application.updated_at,
    }
  })
  .catch((error) => {
    console.error('Error getApplicationById: ', error);
    throw error; 
  });
};

const getApplicationsByUser = (userId) => {
  const url = `applications/users/${userId}`;
  return request(url, 'get').then((response) => {
    const applications = response.data;
    return applications.map((application) => {
      return {
        id: application.id,
        product_type_id: application.product_type_id,
        application_status_id: application.application_status_id,
        user: application.user_id,
        admin: application.admin_user_id,
        desired_amount: application.desired_amount,
        created_at: application.created_at,
        updated_at: application.updated_at,
      }
    })
  })
  .catch((error) => {
    console.error('Error getApplications: ', error);
    throw error; 
  });
};

const getUserByApplicationId = (applicationId) => {
  const url = `users/applications/${applicationId}`;
  return request(url, 'get').then((response) => {
    const user = response.data[0];
    return {
      id: user.id,
      name: user.name,
      lastname: user.lastname,
      users_role_id: user.users_role_id,
      password: user.password,
      address: user.address,
      email: user.email,
      birthdate: user.birthdate,
      document_number: user.document_number,
    }
  })
  .catch((error) => {
    console.error('Error getUserByApplicationId: ', error);
    throw error; 
  });
};

const createApplication = (data) => {
  const url = 'applications';
  return request(url, 'post', data).then((response) => {
    console.log('Application created:', response.data);
    return response.data;
  })
  .catch((error) => {
    console.error('Error createApplication: ', error);
    throw error;
  });
};

const updateApplication = (applicationId, updateData) => {
  const url = `applications/${applicationId}`;
  return request(url, 'put', updateData)
    .then((response) => {
      console.log(`Application ${applicationId} updated.`);
      return response.data;
    })
    .catch((error) => {
      console.error(`Error updateApplication ${applicationId}: `, error);
      throw error;
    });
};

export {
  getApplicationById,
  getApplications,
  getApplicationsByUser,
  createApplication,
  getUserByApplicationId,
  updateApplication
};
