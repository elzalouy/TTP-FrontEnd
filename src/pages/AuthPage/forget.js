import AuthBorder from "./authBorder";
const Forget = () => {
    return ( 
        <AuthBorder>
            <h3 className="login-text">Forget password1</h3>
            <form className="form-inputs">
                <label className="label">Email Address</label>
                <div className="f-inputs">
                    <input className="input-auth" type="email" name="email" placeholder="Email Address" />
                </div>
                
                <div className="f-inputs">
                    <button className="btn-auth">Send</button>
                </div>
            </form>
        </AuthBorder> );
}
 
export default Forget;