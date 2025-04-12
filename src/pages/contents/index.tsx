import {ArrowLeft, ArrowRight} from "lucide-react"
import contents from "../../data/contents.ts";
import {Link} from "react-router-dom"
import PageAnimation from "../../components/page-animation";

export default function ContentsPage(){
    return (
        <PageAnimation>
        <div className="text-white p-8 overflow-x-hidden select-none">
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-4">
                    <Link to="/">
                        <ArrowLeft className="w-[2.441rem] h-[2.441rem] text-white/50 " />
                    </Link>
                    <h3 className="text-4xl font-bold"> Yazılar </h3>
                </div>
                <div className="flex flex-col gap-4 mt-6">
                    {contents.map((content, index) => (
                        <Link
                            to={"/contents/" + content.url}
                            className="bg-blue-300/5 px-5 py-3 rounded-lg text-lg font-medium tracking-wide cursor-pointer hover:-translate-y-[2px] transition duration-300 group flex items-center justify-between"
                            key={index}>
                            <div>
                                <span className="text-white/10 group-hover:text-white transition duration-300">#</span>&nbsp;&nbsp;{content.title}
                            </div>
                            <div>
                                <ArrowRight className="text-white/10 group-hover:text-white transition duration-300" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
        </PageAnimation>
    );
}