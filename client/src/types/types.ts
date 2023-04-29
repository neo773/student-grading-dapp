export interface ResultBatch {
    name: string
    roll: string
    dep: string
    sem: number
    subjectsData: {
        sbcode: string
        marks: string
    }[]
}