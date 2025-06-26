import {ArrowLeft} from "lucide-react";
import {Link} from "react-router-dom";
import PageAnimation from "../../../../components/page-animation";

export default function SiirKadinPage() {
    return (
        <PageAnimation>
            <div className="text-white p-8 overflow-x-hidden select-none">
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center gap-4">
                        <Link to="/contents">
                            <ArrowLeft className="w-[2.441rem] h-[2.441rem] text-white/50 "/>
                        </Link>
                        <h3 className="text-4xl font-bold"> Şiir: Kadın </h3>
                    </div>


                    <div className="flex flex-col gap-4 mt-6 page-content">
                        <p>
                            Sen ne güzelsin kadın nasıl bir ayrıcalıksın.<br/>
                            Ne bakıyor gözlerin öyle?<br/>
                            Nedir bu tebessümün sihirli anahtarı? <br/>
                            Ya al götür beni diyeceğim ama zaten götürmüşsün <br/>
                            Evirip çevirmişsin geri getirmeye de niyetin yok
                        </p>
                        <p>
                            Sen ne güzelsin be kadın <br/>
                            Hangi kitap anlatabilir seni? <br/>
                            hangi sayfaya sığar duruşun? <br/>
                            hangi kalem yazmaya yeltenir <br/>
                            hangi silgi silmeye kıyabilir seni
                        </p>
                        <p>
                            Güzelsin be kadın, <br/>
                            Düşüncelerin gibi <br/>
                            Duyguların vurmuş yüzüne <br/>
                            Bize ah çekmek kalıyor <br/>
                            Yakın olabilmek ne haddimize <br/>
                            Karşında dik durabilmek bile zor.
                        </p>
                        <p>
                            Ne zorsun be kadın ne engel dolusun. <br/>
                            Kim cesaret edecek bu duvarları yıkmaya söyle <br/>
                            Kim eline dokunmak için gelebilecek <br/>
                            İndir artık şu yelkenleri suya <br/>
                            Bir hak ver be kadın <br/>
                            Bir şans ver
                        </p>
                        <p>
                            Bekletme artık kadın <br/>
                            Kapında köle oldum <br/>
                            Sen gelmedin bana <br/>
                            Sen gelmedikçe ben; <br/>
                            Hiç gidemedim senden. <br/>
                            Bugün yine seni anıyor yüreğim. <br/>
                            Dün gibi değil daha çok <br/>
                            Başlangıçta sensin bitişte <br/>
                        </p>

                        <blockquote>
                            Başka çarem yok <br/>
                            Senden başka
                        </blockquote>
                    </div>
                </div>
            </div>
        </PageAnimation>
    )
}