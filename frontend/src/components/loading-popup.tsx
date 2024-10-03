import { LoadingSpinner } from "./loading-spinner";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";

export default function LoadingPopup({ open }: { open: boolean }) {
    return (
        <AlertDialog open={open}>
            <AlertDialogContent className="w-fit">
                <AlertDialogHeader>
                    <AlertDialogTitle>Loading...</AlertDialogTitle>
                    <AlertDialogDescription className="flex justify-center">
                        <LoadingSpinner />
                    </AlertDialogDescription>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    )
}