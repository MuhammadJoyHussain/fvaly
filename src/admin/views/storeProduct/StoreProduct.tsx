import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import useAsync from 'hooks/useAsync';
import { useCallback } from 'react';
import { Spinner } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { IStore } from 'types';
import imageUrlParser from 'utils/imageUrlParser';
import StoreService from 'services/StoreService';
import ProductService from 'services/ProductService';
import { FaEdit, FaPlus } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';

interface IParams {
  id: string;
}

const StoreProduct = () => {
  const { id } = useParams<IParams>();
  const getProduct = useCallback(() => {
    return StoreService.getStoreProduct(id);
  }, [id]);

  const { data, isLoading, isSuccess, isError, error } =
    useAsync<IStore[]>(getProduct);

  const deleteHandler = (id: any) => {
    ProductService.deleteProduct(id);
  };

  return (
    <div>
      <CCard>
        <CCardHeader className="d-flex justify-content-between">
          Product List
          <Link to={`/dashboard/store/${id}/add-product`}>
            <CButton variant="outline" color="primary">
              <FaPlus /> Add Product
            </CButton>
          </Link>
        </CCardHeader>
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Image</CTableHeaderCell>
                <CTableHeaderCell>Name</CTableHeaderCell>
                <CTableHeaderCell>Price</CTableHeaderCell>
                <CTableHeaderCell>Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {isLoading && <Spinner animation="border" />}
              {isSuccess &&
                data?.map((product) => (
                  <CTableRow key={product._id}>
                    <CTableHeaderCell>
                      <img
                        width={100}
                        src={imageUrlParser(product.image)}
                        alt=""
                      />
                    </CTableHeaderCell>
                    <CTableDataCell>{product.name}</CTableDataCell>
                    <CTableDataCell>{product.price}</CTableDataCell>
                    <CTableDataCell>
                      <CButton variant="outline" color="primary">
                        <FaEdit />
                      </CButton>
                      <CButton
                        onClick={() => deleteHandler(product._id)}
                        className="ms-1"
                        variant="outline"
                        color="primary"
                      >
                        <AiFillDelete />
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              {isError && <h3>{error}</h3>}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default StoreProduct;
