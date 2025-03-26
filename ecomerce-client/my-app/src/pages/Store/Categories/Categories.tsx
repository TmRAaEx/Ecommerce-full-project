import {categories} from "@utils/categoryArray.ts";
import {Link} from "react-router";

export default function Categories() {
    return (
        <ul className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-5 divide-y divide-gray-200">
            <li><h1 className={"text-xl text-center"}>Categories</h1></li>
            {categories.map((category) => (
                <li
                    key={category}
                    className="p-3 text-lg font-semibold text-gray-700 hover:bg-gray-100 cursor-pointer rounded-md transition capitalize"
                >
                    <Link to={`${category}`}>
                        {category}
                    </Link>
                </li>
            ))}
        </ul>
    )
}