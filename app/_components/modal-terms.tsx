import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AlertCircle } from "lucide-react";

export const ModalTerms = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>Ketentuan aplikasi</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-x-1">
            <AlertCircle className="size-5" />
            Ketentuan Aplikasi
          </AlertDialogTitle>
          <AlertDialogDescription>
            Selamat datang di aplikasi eksklusif Universitas Muhammadiyah
            Kendari. Demi menjaga integritas dan keamanan layanan, kami ingin
            menginformasikan bahwa akses ke aplikasi ini diperuntukkan khusus
            bagi{" "}
            <span className="font-semibold text-black/80">
              sivitas akademika Universitas Muhammadiyah Kendari.
            </span>{" "}
            <br />
            Penggunaan aplikasi ini mensyaratkan alamat email resmi dengan
            domain{" "}
            <span className="font-semibold text-black/80">
              umkendari.ac.id
            </span>{" "}
            . Hal ini bertujuan untuk memastikan bahwa sumber daya dan layanan
            yang kami sediakan dapat dimanfaatkan secara optimal oleh komunitas
            kampus yang sah. Kami menghargai partisipasi Anda dalam menciptakan
            lingkungan digital yang aman dan produktif bagi seluruh warga
            kampus.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Tutup</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
