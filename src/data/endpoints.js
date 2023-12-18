export default {
  admin_session: 'admins/sign_in',
  destroy_admin_session: 'admins/sign_out',
  current_admin: 'admin',
  minister_session: 'ministers/sign_in',
  destroy_minister_session: 'ministers/sign_out',
  create_minister_password_token: 'ministers/password',
  update_minister_password: 'ministers/password',
  minister_confirmation: (token) => `ministers/confirmation?confirmation_token=${token}`,
  current_minister: 'minister',

  create_category: 'categories',
  update_category: 'categories',
  delete_category: (id) => `categories/${id}`,
  index_categories: 'categories',
  read_category: (name) => `categories/${name}`,

  create_minister: 'ministers',
  update_minister: 'ministers',
  delete_minister: (id) => `ministers/${id}`,
  index_ministers: 'ministers',
  read_minister: (url) => `ministers/${url}`,

  create_article: 'articles',
  update_article: 'articles',
  delete_article: (id) => `articles/${id}`,
  index_articles: 'articles',
  read_article: (id) => `articles/${id}`,
  search_articles: (params) => `search?${params}`,

  index_drafts: 'drafts',

  index_published_articles: (params) => `articles/published?${params}`,
  index_ministers_articles: (id) => `articles/published?minister_id=${id}`,

  ask_question: 'ask',
};
