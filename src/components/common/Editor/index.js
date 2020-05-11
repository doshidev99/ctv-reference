import React, { Component } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.core.css";
import { message } from "antd";
import { getSignedUrlS3, uploadFile } from "../../../utils/uploadFile";
import QuillEditorWrapper from "./styles";

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.isChangeState = false;
    this.handleChange = this.handleChange.bind(this);
    this.state = { value: "" };

    this.quillModules = {
      toolbar: {
        container: [
          [{ header: [1, 2, false] }, { font: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          // ["clean"],
        ],
        handlers: {
          image: this.uploadImage,
        },
      },
    };
  }

  componentDidMount() {
    this.setState({
      value: this.props.content || "",
    })
  }

  handleChange = (value) => {
    this.isChangeState = true;
    this.setState({ value });
    this.props.onChange(value);
  };

  uploadImage = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();

      formData.append("image", file);

      // Save current cursor state
      const range = this.quill.getEditor().getSelection(true);

      // Insert temporary loading placeholder image
      this.quill.getEditor().insertEmbed(
        range.index,
        "image",
        `${window.location.origin}/images/loaders/placeholder.gif`,
      );

      // Move cursor to right side of image (easier to continue typing)
      this.quill.getEditor().setSelection(range.index + 1);
      try {
        const signedUrlS3 = await getSignedUrlS3(
          file.name,
          file.type,
          "IMAGES",
        );
        const response = await uploadFile(file, signedUrlS3.url);
        // Remove placeholder image
        this.quill.getEditor().deleteText(range.index, 1);

        // Insert uploaded image
        // this.quill.getEditor().insertEmbed(range.index, 'image', res.body.image);

        this.quill.getEditor().insertEmbed(range.index, "image", response.url);
      } catch (error) {
        message.error("Xảy ra lỗi, vui lòng thử lại");
      }
    };
  };

  render() {
    const { label, placeholder, content } = this.props;
    let value;
    if (this.isChangeState) {
      value = this.state.value;
    } else if (content) {
      value = content
      // console.log(value);
      
    } else {
      value = "";
    }
    
    const options = {
      theme: "snow",
      formats: Editor.formats,
      placeholder,
      value,
      onChange: this.handleChange,
      modules: this.quillModules,
    };
    return (
      <QuillEditorWrapper>
        <label>{label}</label>
        <ReactQuill
          ref={(el) => {
            this.quill = el;
          }}
          {...options}
        />
      </QuillEditorWrapper>
    );
  }
}
