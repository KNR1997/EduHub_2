import { GridColDef } from "@mui/x-data-grid";
import "./productAddEdit.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProductAddEdit = (props: Props) => {

  // TEST THE API

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => {
      return fetch(`https://localhost:7099/Student`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: 0,
          firstName: "Samosh",
          lastName: "Perera",
          email: "samoshperera@gmail.com",
          phone: 123456,
          dob: "1997-03-10T10:22:25.480Z",
          contactNo: 234555,
          contactPerson: "Praveen",
          classroomId: 1,
          classroomName: "5-A",
        }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`all${props.slug}s`]);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //add new item
    mutation.mutate();
    props.setOpen(false)
  };
  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Add new {props.slug}</h1>
        <form onSubmit={handleSubmit}>
          {/* {props.columns
            .filter((item) => item.field !== "id" && item.field !== "img")
            .map((column) => (
              <div className="item">
                <label>{column.headerName}</label>
                <input type={column.type} placeholder={column.field} />
              </div>
            ))} */}
            <div className="item">
                <label>FirstName</label>
                <input placeholder='firstName' />
            </div>
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default ProductAddEdit;
