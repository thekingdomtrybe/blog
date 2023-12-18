import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { useGetSignedInAdminQuery } from "../../data/admin";
import { useGetSignedInMinisterQuery } from "../../data/ministers";
import Loader from "../Loader/Loader";

function ProtectedRoute({
  children,
  fallback,
  admin,
  ministerOnly,
}) {
  const {
    data: signedInMinister,
    isLoading: isAuthenticatingMinister,
  } = useGetSignedInMinisterQuery();

  const {
    data: signedInAdmin,
    isLoading: isAuthenticatingAdmin,
  } = useGetSignedInAdminQuery();

  if (isAuthenticatingAdmin || isAuthenticatingMinister) return (
    <div className="loader">
      <Loader />
    </div>
  );

  if (admin && signedInAdmin) return children;
  if (ministerOnly && !signedInMinister) return children;
  if (admin && !signedInAdmin) return fallback || <Navigate to="/" />;

  if (signedInMinister || signedInAdmin) return fallback || <Navigate to="/" />

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node,
  admin: PropTypes.bool,
  ministerOnly: PropTypes.bool,
}

ProtectedRoute.defaultProps = {
  fallback: null,
  admin: false,
  ministerOnly: false,
}

export default ProtectedRoute
