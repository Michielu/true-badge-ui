import React from 'react';
import ImageUploader from 'react-images-upload';


// function CreateBadge() {
//     return (
//         <div>
//             <p>Create Badge</p>

//         </div>
//     );
// }

interface Props { }

interface State {
    picture: any,
    uploadStatus: string
};

class CreateBadge extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            picture: null,
            uploadStatus: "Upload Image"
        };
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(pic) {
        console.log("Pic: ", pic)
        this.setState({
            picture: pic,
            uploadStatus: "Image successfully uploaded"
        });
    }

    render() {
        return (
            <div>
                <form>
                    <label>
                        Name:
                        <input type="text" name="name" />
                    </label>

                    <input type="submit" value="Submit" />
                </form>
                <p>{this.state.uploadStatus}</p>
                <ImageUploader
                    withIcon={true}
                    buttonText='Upload image'
                    onChange={this.onDrop}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                    singleImage={true}
                />

            </div>
        );
    }
}

export default CreateBadge;
