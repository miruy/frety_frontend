import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"
import {importData} from "@/axios/import-data";

const Api = () => {
    return (
        <div className="flex-1 px-[10px] mt-14 bg-background">
            <SwaggerUI
                url={`${importData.NEXT_PUBLIC_FRETY_SERVER_URL}${importData.NEXT_PUBLIC_SWAGGER_DOCS_API_URI}`}/>
        </div>
    )
}

export default Api;