import { Link } from 'react-router-dom';

interface TitleProps {
    title: string;
    showButton?: boolean;
}

function Title({ title, showButton }: TitleProps) {
    return (
        <div>
            <div
                className={`flex ${
                    showButton
                        ? 'items-start justify-between sm:flex-row'
                        : 'items-center'
                }  flex-col  sm:items-center gap-4 `}
            >
                <h1 className="uppercase tracking-wide text-[26px] font-normal">
                    {title}
                </h1>
                {showButton && (
                    <Link to={'/shop-all'}>
                        <button className="uppercase py-3  tracking-wide px-7 bg-white border border-black hover:bg-black hover:text-white cursor-pointer transition-all duration-300 ">
                            view all category
                        </button>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Title;
