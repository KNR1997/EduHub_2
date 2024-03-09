/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {useReactTable ,getCoreRowModel , flexRender , getPaginationRowModel} from '@tanstack/react-table'
import React, { useMemo } from 'react';
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
import { MdLastPage } from "react-icons/md";
import { MdFirstPage } from "react-icons/md";

function SubjectTable({subjects , handleEdit ,handleDelete}) {
    const data = useMemo(() => subjects , [subjects]);

    const columns = [
       
        {
            header: 'Subject Name',
            accessorKey : 'SubjectName'
        }
    ]

    const table = useReactTable({data , columns ,getCoreRowModel : getCoreRowModel() , getPaginationRowModel:getPaginationRowModel()} );
    return (
        <div className='mt-5 lg:block'>
        <table className='w-full'>
            <thead className='bg-activeNavLink hidden lg:table-header-group'>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}> 
                        {headerGroup.headers.map(header => <th className='p-1 py-2  tracking-wide text-left' key={header.id}>{flexRender(header.column.columnDef.header , header.getContext())}</th>)}
                    <th className='p-1 py-2  tracking-wide text-left'>Edit/Delete</th>
                    </tr>
                ))}
            </thead>
            <tbody>
               
                {table.getRowModel().rows.map(row => (
                    
                    <tr className='odd:bg-activeNavLinkHover even:bg-activeNavLink ' key={row.id}>{row.getVisibleCells().map(cell => (
                        <td data-cell={`${cell.column.columnDef.header} : `} className='p-1 py-2 tracking-wide text-left block lg:table-cell before:content-[attr(data-cell)] before:font-semibold lg:before:content-[""]' key={cell.id} > {flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                    ))}
                    <td className='p-1 py-2 tracking-wide text-left block lg:table-cell'>
                        <div className='flex  gap-3 items-center'>
                        <FaRegEdit onClick={() => handleEdit(row.original)} className='cursor-pointer opacity-50 hover:opacity-100' />
                        <MdOutlineDelete onClick={() => handleDelete(row.original)} className='cursor-pointer opacity-50 hover:opacity-100' size={20} />
                        </div>
                        
                    </td>
                    </tr>
                ))}
            </tbody>
        </table>
        {subjects.length > 10 && <>
            <div className='flex gap-2 justify-center p-3'>
        <button onClick={() => table.setPageIndex(0) }><MdFirstPage size={22} /></button>
        <button disabled={!table.getCanPreviousPage} onClick={() => table.previousPage()}><MdNavigateBefore size={22} /></button>
        <button disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}><MdNavigateNext size={22} /></button>
        <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}><MdLastPage size={22}/></button>
        </div>
        </>}
        
        
    </div>
    );
}

export default SubjectTable;