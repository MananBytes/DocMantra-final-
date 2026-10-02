import api from './api';

// List documents with optional filters
export const listDocuments = async (params = {}) => {
    const response = await api.get('/api/documents/', { params });
    return response.data;
};

// Get single document
export const getDocument = async (documentId) => {
    const response = await api.get(`/api/documents/${documentId}`);
    return response.data;
};

// Upload document
export const uploadDocument = async (file, metadata = {}) => {
    const formData = new FormData();
    formData.append('file', file);
    if (metadata.title) formData.append('title', metadata.title);
    if (metadata.description) formData.append('description', metadata.description);
    if (metadata.department) formData.append('department', metadata.department);
    if (metadata.category) formData.append('category', metadata.category);

    const response = await api.post('/api/documents/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};

// Delete document
export const deleteDocument = async (documentId) => {
    const response = await api.delete(`/api/documents/${documentId}`);
    return response.data;
};

// Download document
export const downloadDocument = async (documentId) => {
    const response = await api.get(`/api/documents/${documentId}/download`, {
        responseType: 'blob',
    });
    return response.data;
};