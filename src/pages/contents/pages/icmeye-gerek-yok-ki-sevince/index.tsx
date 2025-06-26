import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import PageAnimation from "../../../../components/page-animation";

export default function SiirIcmeyeGerekYokKiSevincePage() {
   return (
      <PageAnimation>
         <div className="text-white p-8 overflow-x-hidden select-none">
            <div className="max-w-2xl mx-auto">
               <div className="flex items-center gap-4">
                  <Link to="/contents">
                     <ArrowLeft className="w-[2.441rem] h-[2.441rem] text-white/50 " />
                  </Link>
                  <h3 className="text-4xl font-bold">
                     {" "}
                     Şiir: İçmeye Gerek Yokki Sevince{" "}
                  </h3>
               </div>

               <div className="flex flex-col gap-4 mt-6 page-content">
                  <p>
                     İçmeye gerek yokki sevince
                     <br />
                     Birinin bardak tutuşu yeter
                     <br />
                     Rakıya karışma ihtimali olmayan <br />
                     Bir suyu içişi hatta <br />
                     Boş bıraktığı bardakta <br />
                     Kalan dudak izi bile sarhoş eder.
                  </p>
                  <p>
                     Mesela, o suyu bir nefeste içerdi <br />
                     Bense bağların tüm şaraplarını <br />
                     İçmiş gibi afallardım <br />
                     Tüm avuçlarına dokunudru şişe, ürperirdim <br />
                     Kupa bardakları tutarken <br />
                     Sanki kulplara güvenmezdi hiç <br />
                     Beş parmağı hep bardağın ağzına tutunurdu <br />
                     Farkında bile değildi <br />
                     Dudaklarının değdiği yerleri kıskandığımı... <br />
                  </p>
                  <p>
                     Çay bardakları <br />
                     İlk iki parmağıyla tanışırdı <br />
                     Üçüncüsü tedirgin, biraz geride kalırdı <br />
                     Biraz soğusun diye <br />
                     Serçe parmağını saklardı <br />
                     Hep bardağın altına <br />
                     Sorsan bilmezdi <br />
                  </p>

                  <blockquote>
                     Sorsan bilmezdi <br />
                     Ben ezbere bilirdim.
                  </blockquote>
               </div>
            </div>
         </div>
      </PageAnimation>
   );
}
