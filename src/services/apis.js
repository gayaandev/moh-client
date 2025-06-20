export const BASE_URL = 'https://moh.sahansoft.com/api';

// Authentication Endpoints
export const REGISTER_SUPERADMIN_URL = `${BASE_URL}/auth/register-superadmin`; // Register Super Admin
export const REGISTER_URL = `${BASE_URL}/auth/register`; // Register User
export const GET_USERS_URL = `${BASE_URL}/auth/users`; // Get All Users
export const GET_SINGLE_USER_URL = (userId) => `${BASE_URL}/auth/users/${userId}`; // Get Single User
export const UPDATE_USER_URL = (userId) => `${BASE_URL}/auth/users/${userId}`; // Update User
export const DELETE_USER_URL = (userId) => `${BASE_URL}/auth/users/${userId}`; // Delete User
export const ADMIN_LOGIN_URL = `${BASE_URL}/auth/login`; // Admin Login

// Menu Endpoints
export const GET_MENU_URL = `${BASE_URL}/menu`; // Get Public Menu
export const CREATE_MENU_ITEM_URL = `${BASE_URL}/menu/items`; // Create Menu Item
export const GET_ALL_MENU_ITEMS_URL = `${BASE_URL}/menu/items/all`; // Get All Menu Items
export const GET_SINGLE_MENU_ITEM_URL = (id) => `${BASE_URL}/menu/items/${id}`; // Get Single Menu Item
export const UPDATE_MENU_ITEM_URL = (id) => `${BASE_URL}/menu/items/${id}`; // Update Menu Item
export const DELETE_MENU_ITEM_URL = (id) => `${BASE_URL}/menu/items/${id}`; // Delete Menu Item

// Page Endpoints
export const GET_HOMEPAGE_URL = `${BASE_URL}/admin/pages/homepage`; // Get Homepage Content
export const GET_PAGE_BY_SLUG_URL = (slug) => `${BASE_URL}/admin/pages/${slug}`; // Get Page by Slug
export const CREATE_PAGE_URL = `${BASE_URL}/admin/pages`; // Create New Page
export const GET_ALL_PAGES_URL = `${BASE_URL}/admin/pages`; // Get All Pages
export const GET_SINGLE_PAGE_URL = (id) => `${BASE_URL}/admin/pages/${id}`; // Get Single Page
export const UPDATE_PAGE_URL = (idOrSlug) => `${BASE_URL}/admin/pages/${idOrSlug}`; // Update Page
export const DELETE_PAGE_URL = (idOrSlug) => `${BASE_URL}/admin/pages/${idOrSlug}`; // Delete Page

// Section Endpoints
export const CREATE_SECTION_URL = `${BASE_URL}/sections`; // Create New Section
export const GET_ALL_SECTIONS_URL = `${BASE_URL}/sections`; // Get All Sections
export const GET_SINGLE_SECTION_URL = (id) => `${BASE_URL}/sections/${id}`; // Get Single Section
export const UPDATE_SECTION_URL = (id) => `${BASE_URL}/sections/${id}`; // Update Section
export const DELETE_SECTION_URL = (id) => `${BASE_URL}/sections/${id}`; // Delete Section
export const GET_SECTION_BY_NAME_URL = (name) => `${BASE_URL}/sections?name=${name}`; // Get Section by Name

// Upload Endpoints
export const UPLOAD_IMAGES_URL = `${BASE_URL}/upload-images`; // Upload Images
