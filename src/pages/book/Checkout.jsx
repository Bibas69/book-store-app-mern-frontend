import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import { clearCart } from '../../redux/features/cart/cartSlice';
import { useForm } from "react-hook-form"
import { useCreateOrderMutation } from '../../redux/features/orders/orderApi';


const Checkout = () => {

    const [isChecked, setIsChecked] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState("Country");

    const cartItems = useSelector(state => state.cart.cartItems);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleIsChecked = () => {
        setIsChecked(!isChecked)
    };

    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [createOrder, {isLoading, isError}] = useCreateOrderMutation();

  if(isLoading){
    return <div>Loading...</div>
  }
  return (
    <div className='h-full flex flex-col items-center m-8'>
        <div className='w-full h-[150vh] md:h-[115vh] m-4 md:m-8 bg-gray-200'>
            <div className='w-full h-40 flex flex-col justify-center md:px-8 px-4 mt-2'>
                <h2 className='text-gray-800 font-secondary tracking-tighter font-semibold text-2xl'>Cash on Delivery</h2>
                <p className='font-secondary tracking-tighter text-md mt-2 text-discount'>Items: {cartItems.length}</p>
                <p className='font-secondary tracking-tighter text-md text-discount'>Total Price: ${totalPrice}</p>
            </div>
            <form 
              onSubmit={handleSubmit(async (data) => {
                if (!isChecked) {
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "You must agree to the Terms & Conditions.",
                    footer: '<a href="#">Why do I have this issue?</a>'
                  });
                  return;
                }
                const newOrder = {
                  fullname: data.fullname,
                  email: data.email,
                  address: {
                    city: data.city,
                    country: data.country,
                    state: data.state,
                    zipcode: data.zipcode
                  },
                  phone: data.phone,
                  productsId: cartItems.map(item => item?._id),
                  totalPrice: totalPrice
                };
                try {
                  await createOrder(newOrder).unwrap();
                  Swal.fire({
                    icon: "success",
                    title: "Order Placed!",
                    text: "Your order has been submitted successfully.",
                  }).then(() => {
                    console.log(newOrder);
                    dispatch(clearCart());
                    navigate("/orders");
                  });
                } catch (err) {
                  alert("Failed to place order...");
                }
              })}
              className='h-212 md:h-164 flex mt-0 m-4 md:m-8 md:mt-0 bg-white rounded-md shadow' 
            >
              <div className='left w-[30%] h-full px-6 md:px-16 py-4 md:py-8'>
                  <h2 className='text-gray-600 font-secondary tracking-tighter font-semibold text-2xl'>Personal Details</h2>
                  <p className='font-secondary text-md text-discount'>Please fill out all the fields.</p>
              </div>
              <div className="right w-[70%] h-full px-6 md:px-22 py-4 md:py-8 flex flex-col gap-4">
                  <div className='flex flex-col'>
                      <label className='text-md text-gray-600 font-secondary' htmlFor="fullname">Full Name</label>
                      <input {...register("fullname", { required: "Full name is required" })} className='w-full h-8 bg-gray-200 inset-shadow-xs inset-shadow-gray-400 outline-none px-4 rounded-md ' type="text" id='fullname'/>
                      {errors.fullname && <span className="text-red-500 text-xs">{errors.fullname.message}</span>}
                  </div>
                  <div className='flex flex-col'>
                      <label className='text-md text-gray-600 font-secondary' htmlFor="email">Email Address</label>
                      <input {...register("email", { required: "Email is required" })} className='w-full h-8 bg-gray-200 inset-shadow-xs inset-shadow-gray-400 outline-none px-4 rounded-md ' type="email" id='email'/>
                      {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                  </div>
                  <div className='flex flex-col'>
                      <label className='text-md text-gray-600 font-secondary' htmlFor="phone">Phone Number</label>
                      <input {...register("phone", { required: "Phone is required" })} className='w-full h-8 bg-gray-200 inset-shadow-xs inset-shadow-gray-400 outline-none px-4 rounded-md ' type="number" id='phone'/>
                      {errors.phone && <span className="text-red-500 text-xs">{errors.phone.message}</span>}
                  </div>
                  <div className='w-full flex flex-col md:flex-row gap-2 md:gap-6'>
                      <div className='w-54 md:w-[60%] flex flex-col'>
                          <label className='text-md text-gray-600 font-secondary' htmlFor="adress">Address/Street</label>
                          <input {...register("address", { required: "Address/Street is required" })} className='h-8 bg-gray-200 inset-shadow-xs inset-shadow-gray-400 outline-none px-4 rounded-md' type="text" name='address' id='address'/>
                          {errors.address && <span className="text-red-500 text-xs">{errors.address.message}</span>}
                      </div>
                      <div className='w-54 md:w-[40%] flex flex-col'>
                          <label className='text-md text-gray-600 font-secondary' htmlFor="city">City</label>
                          <input {...register("city", { required: "City is required" })} className='h-8 bg-gray-200 inset-shadow-xs inset-shadow-gray-400 outline-none px-4 rounded-md' type="text" name='city' id='city'/>
                          {errors.city && <span className="text-red-500 text-xs">{errors.city.message}</span>}
                      </div>
                  </div>
                  <div className='w-full flex flex-col gap-6'>
                      <div className='w-full flex flex-col md:flex-row gap-6'>
                          <div className='w-54 md:w-[60%] flex-[2] flex flex-col'>
                              <label className='text-md text-gray-600 font-secondary' htmlFor="country">Country/Region</label>
                              <select {...register("country", { required: "Country is required" })} onChange={(e) => setSelectedCountry(e.target.value)} className={`h-8 ${selectedCountry === "Country" ? "text-discount" : "text-primary"} bg-gray-200 inset-shadow-xs inset-shadow-gray-400 outline-none px-4 rounded-md`} name="country" id="country">
                                      <option value="Country">Country</option>
                                      <option value="Afghanistan">Afghanistan</option>
                                      <option value="Åland Islands">Åland Islands</option>
                                      <option value="Albania">Albania</option>
                                      <option value="Algeria">Algeria</option>
                                      <option value="American Samoa">American Samoa</option>
                                      <option value="Andorra">Andorra</option>
                                      <option value="Angola">Angola</option>
                                      <option value="Anguilla">Anguilla</option>
                                      <option value="Antarctica">Antarctica</option>
                                      <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                                      <option value="Argentina">Argentina</option>
                                      <option value="Armenia">Armenia</option>
                                      <option value="Aruba">Aruba</option>
                                      <option value="Australia">Australia</option>
                                      <option value="Austria">Austria</option>
                                      <option value="Azerbaijan">Azerbaijan</option>
                                      <option value="Bahamas">Bahamas</option>
                                      <option value="Bahrain">Bahrain</option>
                                      <option value="Bangladesh">Bangladesh</option>
                                      <option value="Barbados">Barbados</option>
                                      <option value="Belarus">Belarus</option>
                                      <option value="Belgium">Belgium</option>
                                      <option value="Belize">Belize</option>
                                      <option value="Benin">Benin</option>
                                      <option value="Bermuda">Bermuda</option>
                                      <option value="Bhutan">Bhutan</option>
                                      <option value="Bolivia">Bolivia</option>
                                      <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                                      <option value="Botswana">Botswana</option>
                                      <option value="Bouvet Island">Bouvet Island</option>
                                      <option value="Brazil">Brazil</option>
                                      <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                                      <option value="Brunei Darussalam">Brunei Darussalam</option>
                                      <option value="Bulgaria">Bulgaria</option>
                                      <option value="Burkina Faso">Burkina Faso</option>
                                      <option value="Burundi">Burundi</option>
                                      <option value="Cambodia">Cambodia</option>
                                      <option value="Cameroon">Cameroon</option>
                                      <option value="Canada">Canada</option>
                                      <option value="Cape Verde">Cape Verde</option>
                                      <option value="Cayman Islands">Cayman Islands</option>
                                      <option value="Central African Republic">Central African Republic</option>
                                      <option value="Chad">Chad</option>
                                      <option value="Chile">Chile</option>
                                      <option value="China">China</option>
                                      <option value="Christmas Island">Christmas Island</option>
                                      <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                                      <option value="Colombia">Colombia</option>
                                      <option value="Comoros">Comoros</option>
                                      <option value="Congo">Congo</option>
                                      <option value="Congo, The Democratic Republic of The">Congo, The Democratic Republic of The</option>
                                      <option value="Cook Islands">Cook Islands</option>
                                      <option value="Costa Rica">Costa Rica</option>
                                      <option value="Cote D'ivoire">Cote D'ivoire</option>
                                      <option value="Croatia">Croatia</option>
                                      <option value="Cuba">Cuba</option>
                                      <option value="Cyprus">Cyprus</option>
                                      <option value="Czech Republic">Czech Republic</option>
                                      <option value="Denmark">Denmark</option>
                                      <option value="Djibouti">Djibouti</option>
                                      <option value="Dominica">Dominica</option>
                                      <option value="Dominican Republic">Dominican Republic</option>
                                      <option value="Ecuador">Ecuador</option>
                                      <option value="Egypt">Egypt</option>
                                      <option value="El Salvador">El Salvador</option>
                                      <option value="Equatorial Guinea">Equatorial Guinea</option>
                                      <option value="Eritrea">Eritrea</option>
                                      <option value="Estonia">Estonia</option>
                                      <option value="Ethiopia">Ethiopia</option>
                                      <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
                                      <option value="Faroe Islands">Faroe Islands</option>
                                      <option value="Fiji">Fiji</option>
                                      <option value="Finland">Finland</option>
                                      <option value="France">France</option>
                                      <option value="French Guiana">French Guiana</option>
                                      <option value="French Polynesia">French Polynesia</option>
                                      <option value="French Southern Territories">French Southern Territories</option>
                                      <option value="Gabon">Gabon</option>
                                      <option value="Gambia">Gambia</option>
                                      <option value="Georgia">Georgia</option>
                                      <option value="Germany">Germany</option>
                                      <option value="Ghana">Ghana</option>
                                      <option value="Gibraltar">Gibraltar</option>
                                      <option value="Greece">Greece</option>
                                      <option value="Greenland">Greenland</option>
                                      <option value="Grenada">Grenada</option>
                                      <option value="Guadeloupe">Guadeloupe</option>
                                      <option value="Guam">Guam</option>
                                      <option value="Guatemala">Guatemala</option>
                                      <option value="Guernsey">Guernsey</option>
                                      <option value="Guinea">Guinea</option>
                                      <option value="Guinea-bissau">Guinea-bissau</option>
                                      <option value="Guyana">Guyana</option>
                                      <option value="Haiti">Haiti</option>
                                      <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
                                      <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
                                      <option value="Honduras">Honduras</option>
                                      <option value="Hong Kong">Hong Kong</option>
                                      <option value="Hungary">Hungary</option>
                                      <option value="Iceland">Iceland</option>
                                      <option value="India">India</option>
                                      <option value="Indonesia">Indonesia</option>
                                      <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
                                      <option value="Iraq">Iraq</option>
                                      <option value="Ireland">Ireland</option>
                                      <option value="Isle of Man">Isle of Man</option>
                                      <option value="Israel">Israel</option>
                                      <option value="Italy">Italy</option>
                                      <option value="Jamaica">Jamaica</option>
                                      <option value="Japan">Japan</option>
                                      <option value="Jersey">Jersey</option>
                                      <option value="Jordan">Jordan</option>
                                      <option value="Kazakhstan">Kazakhstan</option>
                                      <option value="Kenya">Kenya</option>
                                      <option value="Kiribati">Kiribati</option>
                                      <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
                                      <option value="Korea, Republic of">Korea, Republic of</option>
                                      <option value="Kuwait">Kuwait</option>
                                      <option value="Kyrgyzstan">Kyrgyzstan</option>
                                      <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
                                      <option value="Latvia">Latvia</option>
                                      <option value="Lebanon">Lebanon</option>
                                      <option value="Lesotho">Lesotho</option>
                                      <option value="Liberia">Liberia</option>
                                      <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                                      <option value="Liechtenstein">Liechtenstein</option>
                                      <option value="Lithuania">Lithuania</option>
                                      <option value="Luxembourg">Luxembourg</option>
                                      <option value="Macao">Macao</option>
                                      <option value="Macedonia, The Former Yugoslav Republic of">Macedonia, The Former Yugoslav Republic of</option>
                                      <option value="Madagascar">Madagascar</option>
                                      <option value="Malawi">Malawi</option>
                                      <option value="Malaysia">Malaysia</option>
                                      <option value="Maldives">Maldives</option>
                                      <option value="Mali">Mali</option>
                                      <option value="Malta">Malta</option>
                                      <option value="Marshall Islands">Marshall Islands</option>
                                      <option value="Martinique">Martinique</option>
                                      <option value="Mauritania">Mauritania</option>
                                      <option value="Mauritius">Mauritius</option>
                                      <option value="Mayotte">Mayotte</option>
                                      <option value="Mexico">Mexico</option>
                                      <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
                                      <option value="Moldova, Republic of">Moldova, Republic of</option>
                                      <option value="Monaco">Monaco</option>
                                      <option value="Mongolia">Mongolia</option>
                                      <option value="Montenegro">Montenegro</option>
                                      <option value="Montserrat">Montserrat</option>
                                      <option value="Morocco">Morocco</option>
                                      <option value="Mozambique">Mozambique</option>
                                      <option value="Myanmar">Myanmar</option>
                                      <option value="Namibia">Namibia</option>
                                      <option value="Nauru">Nauru</option>
                                      <option value="Nepal">Nepal</option>
                                      <option value="Netherlands">Netherlands</option>
                                      <option value="Netherlands Antilles">Netherlands Antilles</option>
                                      <option value="New Caledonia">New Caledonia</option>
                                      <option value="New Zealand">New Zealand</option>
                                      <option value="Nicaragua">Nicaragua</option>
                                      <option value="Niger">Niger</option>
                                      <option value="Nigeria">Nigeria</option>
                                      <option value="Niue">Niue</option>
                                      <option value="Norfolk Island">Norfolk Island</option>
                                      <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                                      <option value="Norway">Norway</option>
                                      <option value="Oman">Oman</option>
                                      <option value="Pakistan">Pakistan</option>
                                      <option value="Palau">Palau</option>
                                      <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
                                      <option value="Panama">Panama</option>
                                      <option value="Papua New Guinea">Papua New Guinea</option>
                                      <option value="Paraguay">Paraguay</option>
                                      <option value="Peru">Peru</option>
                                      <option value="Philippines">Philippines</option>
                                      <option value="Pitcairn">Pitcairn</option>
                                      <option value="Poland">Poland</option>
                                      <option value="Portugal">Portugal</option>
                                      <option value="Puerto Rico">Puerto Rico</option>
                                      <option value="Qatar">Qatar</option>
                                      <option value="Reunion">Reunion</option>
                                      <option value="Romania">Romania</option>
                                      <option value="Russian Federation">Russian Federation</option>
                                      <option value="Rwanda">Rwanda</option>
                                      <option value="Saint Helena">Saint Helena</option>
                                      <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                                      <option value="Saint Lucia">Saint Lucia</option>
                                      <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                                      <option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option>
                                      <option value="Samoa">Samoa</option>
                                      <option value="San Marino">San Marino</option>
                                      <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                                      <option value="Saudi Arabia">Saudi Arabia</option>
                                      <option value="Senegal">Senegal</option>
                                      <option value="Serbia">Serbia</option>
                                      <option value="Seychelles">Seychelles</option>
                                      <option value="Sierra Leone">Sierra Leone</option>
                                      <option value="Singapore">Singapore</option>
                                      <option value="Slovakia">Slovakia</option>
                                      <option value="Slovenia">Slovenia</option>
                                      <option value="Solomon Islands">Solomon Islands</option>
                                      <option value="Somalia">Somalia</option>
                                      <option value="South Africa">South Africa</option>
                                      <option value="South Georgia and The South Sandwich Islands">South Georgia and The South Sandwich Islands</option>
                                      <option value="Spain">Spain</option>
                                      <option value="Sri Lanka">Sri Lanka</option>
                                      <option value="Sudan">Sudan</option>
                                      <option value="Suriname">Suriname</option>
                                      <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                                      <option value="Swaziland">Swaziland</option>
                                      <option value="Sweden">Sweden</option>
                                      <option value="Switzerland">Switzerland</option>
                                      <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                                      <option value="Taiwan">Taiwan</option>
                                      <option value="Tajikistan">Tajikistan</option>
                                      <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
                                      <option value="Thailand">Thailand</option>
                                      <option value="Timor-leste">Timor-leste</option>
                                      <option value="Togo">Togo</option>
                                      <option value="Tokelau">Tokelau</option>
                                      <option value="Tonga">Tonga</option>
                                      <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                                      <option value="Tunisia">Tunisia</option>
                                      <option value="Turkey">Turkey</option>
                                      <option value="Turkmenistan">Turkmenistan</option>
                                      <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                                      <option value="Tuvalu">Tuvalu</option>
                                      <option value="Uganda">Uganda</option>
                                      <option value="Ukraine">Ukraine</option>
                                      <option value="United Arab Emirates">United Arab Emirates</option>
                                      <option value="United Kingdom">United Kingdom</option>
                                      <option value="United States">United States</option>
                                      <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                                      <option value="Uruguay">Uruguay</option>
                                      <option value="Uzbekistan">Uzbekistan</option>
                                      <option value="Vanuatu">Vanuatu</option>
                                      <option value="Venezuela">Venezuela</option>
                                      <option value="Viet Nam">Viet Nam</option>
                                      <option value="Virgin Islands, British">Virgin Islands, British</option>
                                      <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
                                      <option value="Wallis and Futuna">Wallis and Futuna</option>
                                      <option value="Western Sahara">Western Sahara</option>
                                      <option value="Yemen">Yemen</option>
                                      <option value="Zambia">Zambia</option>
                                      <option value="Zimbabwe">Zimbabwe</option>
                              </select>
                              {errors.country && <span className="text-red-500 text-xs">{errors.country.message}</span>}
                          </div>
                          <div className='w-54 md:w-[40%] flex-[2] flex flex-col'>
                              <label className='text-md text-gray-600 font-secondary' htmlFor="state">State/Province</label>
                              <input {...register("state", { required: "State is required" })} className='h-8 bg-gray-200 inset-shadow-xs inset-shadow-gray-400 outline-none px-4 rounded-md' type="text" name='state' id='state' placeholder='State'/>
                              {errors.state && <span className="text-red-500 text-xs">{errors.state.message}</span>}
                          </div>
                      </div>
                    <div className='flex-1 flex flex-col'>
                      <label className='text-md text-gray-600 font-secondary' htmlFor="zipcode">Zipcode</label>
                      <input {...register("zipcode", { required: "Zipcode is required" })} className='w-54 h-8 bg-gray-200 inset-shadow-xs inset-shadow-gray-400 outline-none px-4 rounded-md' type="number" name='zipcode' id='zipcode'/>
                      {errors.zipcode && <span className="text-red-500 text-xs">{errors.zipcode.message}</span>}
                    </div>
                  </div>
                  <div className='flex gap-2'>
                      <input onChange={handleIsChecked} checked={isChecked} type="checkbox" id='condition'/>
                      <p className='text-md text-gray-600 font-secondary'>I agree to the <Link className='text-blue-500 underline underline-offset-1'>Terms & Conditions</Link> and <Link className='text-blue-500 underline underline-offset-1'>Shopping Policy.</Link></p>
                  </div>
                  <div className='w-full flex justify-center md:justify-end'>
                      <button className={`w-44 h-8 text-white font-secondary shadow rounded-md ${isChecked ? "bg-blue-600" : "bg-blue-400"}`} type="submit">Place an order</button>
                  </div>
              </div>
            </form>
        </div>
    </div>
  )
}

export default Checkout