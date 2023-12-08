import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { CellProps, Column, useTable } from "react-table";
import config from "../../config";
import ModalWindow from "../ModalWindow/ModalWindow";

import { useNavigate } from "react-router-dom";

import { StyledButton } from "../../styles/Global";
import {
  StyledButtonPagination,
  StyledTable,
  StyledTableBody,
  StyledTableCell,
  StyledRemoveButton,
  StyledTableHead,
  StyledTableHeaderCell,
  StyledEditButton,
} from "./Products.styled";

const Products = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<IProduct[]>([]);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState<string | null>(
    null
  );

  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(config.apiUrl, {
          params: {
            _page: currentPage,
            _limit: pageSize,
          },
        });
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [currentPage, pageSize]);

  const handleEdit = (id: string) => {
    navigate(`/product/edit/${id}`);
  };

  const handleAdd = () => {
    navigate(`/product/add/`);
  };

  const handleRemove = (id: string) => {
    setProductIdToDelete(id);
    setDeleteModalOpen(true);
  };

  const getTotalItems = async () => {
    try {
      const { data } = await axios.get(`${config.apiUrl}`);
      return data.length;
    } catch (error) {
      console.error(error);
      return 0;
    }
  };

  const handleNextPage = async () => {
    const totalItems = await getTotalItems();

    if (currentPage * pageSize < totalItems) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleConfirmDelete = async () => {
    if (productIdToDelete) {
      try {
        await axios.delete(`${config.apiUrl}/${productIdToDelete}`);
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productIdToDelete)
        );
        console.log(`Removed product, ${productIdToDelete}`);
      } catch (error) {
        console.error(error);
      } finally {
        setDeleteModalOpen(false);
        setProductIdToDelete(null);
      }
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setProductIdToDelete(null);
  };

  const columns = useMemo<Column<IProduct>[]>(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Manufacturer",
        accessor: (row) => row.manufacturer.name,
      },
      {
        Header: "Price",
        accessor: (row) => `${row.price} €`,
      },
      {
        Header: "Expiry date",
        accessor: "expiryDate",
      },
      {
        Header: "Edit",
        accessor: (row) => `edit-${row.id}`,
        Cell: ({ row }: CellProps<IProduct>) => (
          <StyledEditButton onClick={() => handleEdit(row.original.id)}>
            Edit
          </StyledEditButton>
        ),
      },
      {
        Header: "Remove",
        accessor: (row) => `remove-${row.id}`,
        Cell: ({ row }: CellProps<IProduct>) => (
          <StyledRemoveButton onClick={() => handleRemove(row.original.id)}>
            Remove
          </StyledRemoveButton>
        ),
      },
    ],
    []
  );

  const { getTableBodyProps, getTableProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: products });

  return (
    <div>
      <div style={{ display: "flex", gap: "10px" }}></div>
      <div style={{ marginTop: "30px" }}>
        <StyledButton className="StyledButton" onClick={handleAdd}>
          Add product
        </StyledButton>
        <StyledTable className="StyledTable" {...getTableProps()}>
          <StyledTableHead className="StyledTableHead">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <StyledTableHeaderCell
                    className="StyledTableHeaderCell"
                    {...column.getHeaderProps()}
                  >
                    {column.render("Header")}
                  </StyledTableHeaderCell>
                ))}
              </tr>
            ))}
          </StyledTableHead>
          <StyledTableBody className="StyledTableBody" {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <StyledTableCell
                      className="StyledTableCell"
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}{" "}
                    </StyledTableCell>
                  ))}
                </tr>
              );
            })}
          </StyledTableBody>
        </StyledTable>
        <ModalWindow
          show={isDeleteModalOpen}
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      </div>
      <StyledButtonPagination>
        <StyledButton
          className="StyledButton"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous Page
        </StyledButton>
        <span>{currentPage}</span>
        <StyledButton
          className="StyledButton"
          onClick={handleNextPage}
          disabled={products.length === 0}
        >
          Next Page
        </StyledButton>
      </StyledButtonPagination>
    </div>
  );
};

export default Products;
