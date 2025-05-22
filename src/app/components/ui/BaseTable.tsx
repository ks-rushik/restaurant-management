import { ReactNode, useEffect, useState } from "react";

import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";
import {
  Table,
  TableProps,
  TableStylesNames,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
} from "@mantine/core";
import { useListState } from "@mantine/hooks";
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import clsx from "clsx";
import { MdOutlineDragIndicator } from "react-icons/md";

import { useDictionary } from "@/app/components/context/Dictionary";

import BaseButton from "./BaseButton";

type IColumn<T> = {
  label: string;
  render: (item: T) => ReactNode;
  width?: string;
};

type IBaseTableProps<T> = TableProps & {
  classNames?: Partial<Record<TableStylesNames, string>>;
  columns: IColumn<T>[];
  data?: T[];
  getKey: (item: T) => string | number;
  initialSize?: number;
  loadMoreSize?: number;
  drag?: boolean;
  draggableId?: string;
  DragOn?: (state: T[]) => void;
  pagination: {
    fetchNextPage: (
      options?: FetchNextPageOptions,
    ) => Promise<
      InfiniteQueryObserverResult<
        InfiniteData<{ data: T[]; count: number | null }, unknown>,
        Error
      >
    >;
    hasNextPage: boolean;
  };
};

const BaseTable = <T,>({
  classNames,
  columns,
  data = [],
  getKey,
  drag = false,
  DragOn,
  pagination,
  draggableId = "droppable-list",
  ...other
}: IBaseTableProps<T>) => {
  const { hasNextPage, fetchNextPage } = pagination;
  const lang = useDictionary();

  const { table, th, td, thead, tbody, tr, ...otherElements } =
    classNames || {};
  const [state, handlers] = useListState<T>(data);
  useEffect(() => {
    handlers.setState(data);
  }, [data]);
  useEffect(() => {
    DragOn && DragOn(state);
  }, [state]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    handlers.reorder({
      from: result.source.index,
      to: result.destination.index,
    });
  };

  const renderRow = (row: T, index: number) => (
    <TableTbody key={index}>
      <TableTr key={getKey(row)}>
        {columns.map((col, colIndex) => (
          <TableTd key={colIndex}>{col.render(row)}</TableTd>
        ))}
      </TableTr>
    </TableTbody>
  );

  return (
    <>
      <div className="w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-600 bg-white">
        <div className="w-full overflow-x-auto">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Table
              {...other}
              classNames={{
                thead: clsx(
                  "font-semibold text-gray-600 text-sm bg-gray-300 dark:bg-gray-700  dak:!text-gray-200 h-14",
                  thead,
                ),
                tbody: clsx(
                  "text-sm font-normal bg-white dark:text-white dark:bg-gray-700",
                  tbody,
                ),
                tr: clsx("h-[55px] dark:border-gray-600", tr),
                th: clsx("max-w-28 dark:text-white", th),
                td: clsx("", td),
                table: clsx("", table),
                ...otherElements,
              }}
            >
              <TableThead>
                <TableTr>
                  <TableTh></TableTh>
                  {columns.map((col, index) => (
                    <TableTh key={index}>{col.label}</TableTh>
                  ))}
                </TableTr>
              </TableThead>

              {drag ? (
                <Droppable droppableId={draggableId}>
                  {(provided) => (
                    <TableTbody
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {state.map((row, index) => (
                        <Draggable
                          key={getKey(row).toString()}
                          draggableId={getKey(row).toString()}
                          index={index}
                        >
                          {(provided) => (
                            <TableTr
                              ref={provided.innerRef}
                              className="w-full"
                              {...provided.draggableProps}
                            >
                              <TableTd
                                className="w-[40px]"
                                {...provided.dragHandleProps}
                              >
                                <MdOutlineDragIndicator size={20} />
                              </TableTd>
                              {columns.map((col, colIndex) => (
                                <TableTd
                                  key={colIndex}
                                  className="w-[500px] overflow-hidden"
                                >
                                  {col.render(row)}
                                </TableTd>
                              ))}
                            </TableTr>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </TableTbody>
                  )}
                </Droppable>
              ) : (
                state.map((row, index) => renderRow(row, index))
              )}
            </Table>
          </DragDropContext>
        </div>
      </div>

      {hasNextPage && (
        <div className="flex justify-center">
          <BaseButton onClick={() => fetchNextPage()} className="mt-4">
            {lang.table.loadmore}
          </BaseButton>
        </div>
      )}
    </>
  );
};

export default BaseTable;
