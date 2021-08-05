import React, { useEffect, useState } from "react";
import { Jumbotron } from "react-bootstrap";
import Layout from "../../components/layout";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function Home() {
    class UploadAdapter {
        constructor(loader) {
            this.loader = loader;
        }

        upload() {
            return this.loader.file.then(
                (file) =>
                    new Promise((resolve, reject) => {
                        var myReader = new FileReader();
                        myReader.onloadend = (e) => {
                            resolve({ default: myReader.result });
                        };

                        myReader.readAsDataURL(file);
                    })
            );
        }
    }
    return (
        <Layout sidebar>
            <CKEditor
                editor={ClassicEditor}
                data="<p>Hello from CKEditor 5!</p>"
                onInit={(editor) => {
                    //// Here the editor is ready to be used
                }}
                onChange={(event, editor) => {
                    event.plugins.get("FileRepository").createUploadAdapter =
                        function (loader) {
                            console.log(btoa(loader.file));
                            return new UploadAdapter(loader);
                        };
                }}
                onBlur={(event, editor) => {
                    console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                    console.log("Focus.", editor);
                }}
            />
            <Jumbotron
                style={{ margin: "5rem", background: "#fff" }}
                className="text-center"
            >
                <h1>Welcome to Admin Dashboard</h1>
                <p>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum is that it has a
                    more-or-less normal distribution of letters, as opposed to
                    using 'Content here, content here', making it look like
                    readable English. Many desktop publishing packages and web
                    page editors now use Lorem Ipsum as their default model
                    text, and a sear
                </p>
            </Jumbotron>
        </Layout>
    );
}
