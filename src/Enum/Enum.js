import * as Yup from "yup";

export const data = [
  {
    team: "Engineering",
    employees: ["Lawana Fan", "Larry Rainer", "Aman Juneja", "Leah Shumway"],
  },
  {
    team: "Executive",
    employees: ["Rohan Gupta", "Ronda Dean", "Robby Maharaj"],
  },
  {
    team: "Finance",
    employees: ["Caleb Brown", "Carol Smithson", "Carl Sorensen"],
  },
  { team: "Sales", employees: ["Ankit Tiwari", "Ramesh Kumar"] },
];

export const initialValue = {
  team: "",
  employee: "",
};
export const schema = Yup.object().shape({
  team: Yup.string().required("Please Select Team"),
  employee: Yup.string().required("Please Select Employee"),
});
