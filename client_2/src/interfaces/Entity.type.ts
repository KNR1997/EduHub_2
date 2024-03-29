export type StudentInterface = {
    id: number
    firstName: string;
    lastName: string;
    email: string;
    contactNo: string;
    dob: string;
    classroomName: string;
    contactPerson: string;
};

export type ClassInterface = {
    id: number
    name: string;
};

export type TeacherInterface = {
    id: number
    firstName: string;
    lastName: string;
    email: string;
    contactNo: string;
};

export type SubjectInterface = {
    id: number
    name: string;
};

export type SubjectAllocateInterface = {
    teacherId: number
    subjectId: number
};
