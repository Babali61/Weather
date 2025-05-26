import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import { selectEmployees } from '../../store/features/employeeSlice';
import './page.css';

/**
 * @component EmployeeList
 * @description Composant d'affichage de la liste des employés avec pagination et filtrage
 * @returns {JSX.Element} Liste des employés
 */
const EmployeeList = () => {
  // Récupération des employés depuis Redux
  const employees = useSelector(selectEmployees);
  
  // Définition des colonnes pour la table
  const columns = useMemo(
    () => [
      {
        Header: 'Prénom',
        accessor: 'firstName',
      },
      {
        Header: 'Nom',
        accessor: 'lastName',
      },
      {
        Header: 'Date de début',
        accessor: 'startDate',
      },
      {
        Header: 'Département',
        accessor: 'department',
      },
      {
        Header: 'Date de naissance',
        accessor: 'dateOfBirth',
      },
      {
        Header: 'Rue',
        accessor: 'street',
      },
      {
        Header: 'Ville',
        accessor: 'city',
      },
      {
        Header: 'État',
        accessor: 'state',
      },
      {
        Header: 'Code postal',
        accessor: 'zipCode',
      },
    ],
    []
  );
  
  // Filtrage global des données
  const [filterInput, setFilterInput] = useState('');
  
  const handleFilterChange = (e) => {
    const value = e.target.value || '';
    setFilterInput(value);
    setGlobalFilter(value);
  };
  
  // Configuration de la table avec react-table
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
  } = useTable(
    {
      columns,
      data: employees,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  
  // Calculer les entrées à afficher en fonction de la pagination
  const { pageIndex, pageSize } = state;
  const entriesInfo = useMemo(() => {
    const from = pageIndex * pageSize + 1;
    const to = Math.min((pageIndex + 1) * pageSize, employees.length);
    const total = employees.length;
    
    return { from, to, total };
  }, [pageIndex, pageSize, employees.length]);
  
  return (
    <div className="employee-list fade-in">
      <div className="title-section">
        <h1>HRnet</h1>
        <p>Application de gestion des ressources humaines</p>
      </div>
      
      <div className="container">
        <div className="card slide-up">
          <div className="card-header">
            <h2>Employés actuels</h2>
            <Link to="/" className="link">Retour à l'accueil</Link>
          </div>
          
          <div className="table-header">
            <div className="entries-info">
              {employees.length > 0 ? (
                <span>
                  Affichage de {entriesInfo.from} à {entriesInfo.to} sur {entriesInfo.total} entrées
                </span>
              ) : (
                <span>Aucun employé enregistré</span>
              )}
            </div>
            
            <div className="search">
              <label htmlFor="search">Rechercher:</label>
              <input
                id="search"
                type="text"
                value={filterInput}
                onChange={handleFilterChange}
                placeholder="Rechercher..."
              />
            </div>
          </div>
          
          {employees.length > 0 ? (
            <>
              <div className="table-container">
                <table {...getTableProps()} className="table">
                  <thead>
                    {headerGroups.map(headerGroup => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                          <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                            {column.render('Header')}
                            <span className="sort-indicator">
                              {column.isSorted
                                ? column.isSortedDesc
                                  ? ' ▼'
                                  : ' ▲'
                                : ''}
                            </span>
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {page.map(row => {
                      prepareRow(row);
                      return (
                        <tr {...row.getRowProps()}>
                          {row.cells.map(cell => (
                            <td {...cell.getCellProps()}>
                              {cell.render('Cell')}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              
              <div className="pagination">
                <button 
                  onClick={() => gotoPage(0)} 
                  disabled={!canPreviousPage}
                  title="Première page"
                >
                  {'<<'}
                </button>
                <button 
                  onClick={() => previousPage()} 
                  disabled={!canPreviousPage}
                  title="Page précédente"
                >
                  {'<'}
                </button>
                <span className="page-info">
                  Page{' '}
                  <strong>
                    {pageIndex + 1} sur {pageOptions.length}
                  </strong>
                </span>
                <button 
                  onClick={() => nextPage()} 
                  disabled={!canNextPage}
                  title="Page suivante"
                >
                  {'>'}
                </button>
                <button 
                  onClick={() => gotoPage(pageCount - 1)} 
                  disabled={!canNextPage}
                  title="Dernière page"
                >
                  {'>>'}
                </button>
                
                <select
                  value={pageSize}
                  onChange={e => {
                    setPageSize(Number(e.target.value));
                  }}
                  title="Nombre d'entrées par page"
                >
                  {[10, 25, 50, 100].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                      {pageSize} par page
                    </option>
                  ))}
                </select>
              </div>
            </>
          ) : (
            <div className="message message-info">
              <p>Aucun employé enregistré. Veuillez en créer un depuis la page d'accueil.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;