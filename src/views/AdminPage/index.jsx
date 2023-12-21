import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AddCategory from '../../components/AddCategory';
import AddMinister from '../../components/AddMinister';
import CategoryListItem from '../../components/CategoryListItem';
import MinisterListItem from '../../components/MinisterListItem';
import BlueButton from '../../components/BlueButton';
import { useLogoutAdminMutation } from '../../data/admin';
import Styles from './styles.module.css';
import EditCategory from '../../components/EditCategory';

function AdminPage({
  categories,
  ministers,
}) {
  const [
    logoutAdmin,
    {
      isSuccess: adminLoggedOut,
    }
  ] = useLogoutAdminMutation();

  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    if (adminLoggedOut) window.location.reload();
  }, [adminLoggedOut]);

  return (
    <main className={Styles['admin-page']}>
      <div className={Styles.heading}>
        <h1>MANAGE BLOG</h1>
        <BlueButton text="LOGOUT" onClick={logoutAdmin} />
      </div>

      <div className={Styles['category-controls']}>
        <h2>CATEGORIES</h2>
        <ul>
          {
            categories.map(category => (
              <CategoryListItem
                key={category.id}
                id={category.id}
                name={category.name}
                image={category.image.url}
                showEdit={!editingCategory}
                onEdit={() => {
                  setEditingCategory(category)
                }}
              />
            ))
          }
        </ul>
        {
          editingCategory
            ? <EditCategory
                id={editingCategory.id}
                name={editingCategory.name}
                image={editingCategory.image.url}
                description={editingCategory.description}
                onSaved={() => setEditingCategory(null)}
              />
            : <AddCategory />
        }
      </div>

      <div className={Styles['ministers-controls']}>
        <h2>AUTHORS</h2>
        <ul>
          {
            ministers.map(minister => (
              <MinisterListItem
                key={minister.id}
                id={minister.id}
                name={minister.name}
                image={
                  minister.image.url ||
                  'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg'
                }
              />
            ))
          }
        </ul>
        <AddMinister />
      </div>
    </main>
  )
}

AdminPage.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
  ministers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.shape({
      url: PropTypes.string,
    }).isRequired,
  })).isRequired,
}

export default AdminPage
