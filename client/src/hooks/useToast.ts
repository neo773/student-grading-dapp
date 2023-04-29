import toast, { ToastOptions } from 'react-hot-toast'


const options = {
    position: "top-right",
    style: {
        background: 'rgb(58 58 58 / 72%)',
        border: '1px solid rgb(83 83 83)',
        padding: '16px',
        color: '#fff',
        backdropFilter: 'blur(8px)'
    },
    duration: 3000,
    iconTheme: {
        primary: '#19aa83',
        secondary: '#FFFAEE'
    }
} as ToastOptions


const useToast = (type: 'success' | 'error', message: string) => {
    return type === 'success' 
                  ? toast.success(message, options) 
                  : toast.error(message, options)
}

export default useToast