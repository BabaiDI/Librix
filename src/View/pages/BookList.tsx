import { useState } from "react";
import { Database, Tables } from "../../database.types";
import { useLoaderData } from "react-router-dom";

function Book() {
  const book: Tables<"book"> = useLoaderData();

  return (
    <>
      <h1>{book?.id ?? "no id"}</h1>
      <span>{book?.title}</span>
      <br />
      <span>{book?.description ?? "no description"}</span>
    </>
  );
}

export default Book;
