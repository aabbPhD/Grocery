import { Link } from "react-router-dom"
import { categoriesRuToEn } from "../utils/pathMap"

type PathToPageProps = {
    productCategory?: string,
    productName?: string,
}

export default function Breadcrumbs({productCategory, productName}: PathToPageProps) {

    return (
        <div className="breadcrumbs">
            <Link className="nav-link" to="/">Главная</Link>
            <span className="nav-link-arrow">{'>'}</span>
            <Link className="nav-link disabled" to="#">Категории</Link>
            {productCategory && !productName &&
            <>
                <span className="nav-link-arrow">{'>'}</span>
                <Link className="nav-link active" to='#'>{productCategory}</Link>
            </>}
            {productCategory && productName && 
            <> 
                <span className="nav-link-arrow">{'>'}</span>
                <Link className="nav-link" to={"/" + categoriesRuToEn[productCategory]}>{productCategory}</Link>
                <span className="nav-link-arrow">{'>'}</span>
                <Link className="nav-link active" to='#'>{productName}</Link>
            </>}
        </div>
    )
}