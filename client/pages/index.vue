<template>
  <div class="container">
    <div class="main">
      <div class="section">
        <svg viewBox="0 0 24 24" aria-hidden="true" class="img-main">
          <g>
            <path
              d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"
            ></path>
          </g>
        </svg>
      </div>
      <div class="hero">
        <svg viewBox="0 0 24 24" aria-hidden="true" class="img">
          <g>
            <path
              d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"
            ></path>
          </g>
        </svg>
        <h2>Happening now</h2>
        <h4>Join Twitter today.</h4>
        <button class="btn google-sign">Sign up with Google</button>
        <p class="or"><span>or</span></p>
        <div class="email">
          <button class="btn email-signup" @click="showSignUp = true">
            Sign up with your email
          </button>
        </div>
        <p class="tca">
          By signing up, you agree to the <span>Terms of Service</span> and
          <span>Privacy Policy</span>, including <span>Cookie Use</span>.
        </p>
        <div class="sign-in">
          <h6>Already have an account?</h6>
          <button class="btn" @click="login = true">Sign in</button>
        </div>
      </div>

      <div v-if="showSignUp" class="modal-body">
        <div class="modal-container">
          <div class="header">
            <div @click="showSignUp = false" class="close-body">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                class="close"
                style="color: rgb(239, 243, 244)"
              >
                <g>
                  <path
                    d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"
                  ></path>
                </g>
              </svg>
            </div>
            <div class="steps">Step {{ step }} of 3</div>
          </div>
          <div class="step-container">
            <div class="single-step" v-if="step === 1">
              <h3>Create your account</h3>
              <form action="">
                <div class="input-form">
                  <label class="label-name">Name</label>
                  <input
                    @keyup="name.length > 0 ? (nameError = true) : ''"
                    ref="name"
                    v-model="name"
                    :class="[
                      nameError && !name ? 'error input-field' : 'input-field',
                    ]"
                    type="text"
                    :placeholder="placeholderName"
                  />
                  <span v-if="nameError && !name" class="errorSpan">
                    What is your name?
                  </span>
                </div>
                <br />
                <br />
                <div class="input-form">
                  <label class="label-name">Email</label>
                  <input
                    @keyup="
                      verifyEmail ? (emailError = false) : (emailError = true)
                    "
                    ref="email"
                    v-model="email"
                    :class="[emailError ? 'error input-field' : 'input-field']"
                    type="email"
                    placeholder="Email"
                  />
                  <span v-if="emailError" class="errorSpan">
                    Enter a valid email
                  </span>
                </div>
                <div class="dob">
                  <h4>Date of birth</h4>
                  <p>
                    This will not be shown publicly. Confirm your own age, even
                    if this account is for a business, a pet, or something else.
                  </p>
                  <div class="date-flex">
                    <div class="month">
                      <div class="input-form">
                        <label class="label-name-1">Month</label>
                        <select
                          @change="getDays()"
                          ref="month"
                          v-model="month"
                          :class="[
                            monthError && !month
                              ? 'error input-field'
                              : 'input-field',
                          ]"
                        >
                          <option v-for="(month, i) in months" :key="i">
                            {{ month }}
                          </option>
                        </select>
                        <span v-if="monthError && !month" class="errorSpan">
                          What is your birth month
                        </span>
                      </div>
                    </div>
                    <div class="month">
                      <div class="input-form">
                        <label class="label-name-1">Day</label>
                        <select
                          ref="day"
                          v-model="day"
                          :class="[
                            dayError && !day
                              ? 'error input-field'
                              : 'input-field',
                          ]"
                        >
                          <option v-for="(day, i) in days" :key="i">
                            {{ day }}
                          </option>
                        </select>
                        <span v-if="dayError && !day" class="errorSpan">
                          What is your birth day
                        </span>
                      </div>
                    </div>
                    <div class="month">
                      <div class="input-form">
                        <label class="label-name-1">Year</label>
                        <select
                          ref="year"
                          v-model="year"
                          :class="[
                            yearError && !year
                              ? 'error input-field'
                              : 'input-field',
                          ]"
                        >
                          <option v-for="(year, i) in years" :key="i">
                            {{ year }}
                          </option>
                        </select>
                        <span v-if="yearError && !year" class="errorSpan">
                          What is your birth year
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="next" @click="step = 2">
                  <button
                    :disabled="!name || !verifyEmail || !month || !year || !day"
                  >
                    Next
                  </button>
                </div>
              </form>
            </div>
            <div class="single-step" v-if="step === 2">
              <h3>We sent you a code</h3>
              <p class="p-verify-email">Enter it below to verify {{ email }}</p>
              <form action="">
                <div class="input-form">
                  <label class="label-name">Verification code</label>
                  <input
                    ref="code"
                    v-model="code"
                    class="input-field"
                    type="text"
                    placeholder="Verification code"
                  />
                  <span class="emailNotReceived"> Resend Email? </span>
                </div>
                <div class="next">
                  <button :disabled="!code" @click="step = 3">Next</button>
                </div>
              </form>
            </div>
            <div class="single-step" v-if="step === 3">
              <h3>Enter your password</h3>
              <form action="">
                <div class="input-form">
                  <label class="label-name">Password</label>
                  <input
                    @keyup="
                      verifyPassword
                        ? (passwordError = false)
                        : (passwordError = true)
                    "
                    ref="password"
                    v-model="password"
                    :class="[
                      passwordError ? 'error input-field' : 'input-field',
                    ]"
                    type="password"
                    placeholder="Password"
                  />
                  <span v-if="passwordError" class="errorSpan">
                    Password must contain at least one uppercase character, one
                    lowercase character, one number and one symbol?
                  </span>
                </div>
                <br />
                <br />
                <div class="input-form">
                  <label class="label-name">Confirm password</label>
                  <input
                    @keyup="
                      password === confirmPassword
                        ? (confirmPasswordError = false)
                        : (confirmPasswordError = true)
                    "
                    ref="confirmPassword"
                    v-model="confirmPassword"
                    :class="[
                      confirmPasswordError
                        ? 'error input-field'
                        : 'input-field',
                    ]"
                    type="password"
                    placeholder="Confirm password"
                  />
                  <span v-if="confirmPasswordError" class="errorSpan">
                    Confirm your password
                  </span>
                </div>
                <div class="next">
                  <button :disabled="password !== confirmPassword">Next</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div v-if="login" class="modal-body">
        <div class="modal-container">
          <div class="header">
            <div @click="login = false" class="close-body">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                class="close"
                style="color: rgb(239, 243, 244)"
              >
                <g>
                  <path
                    d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"
                  ></path>
                </g>
              </svg>
            </div>
            <div class="middle-flex" style="width: 70%">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                class="img"
                style="margin: 0 auto"
              >
                <g>
                  <path
                    d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"
                  ></path>
                </g>
              </svg>
            </div>
          </div>
          <div class="step-container">
            <div class="single-step middle-flex" v-if="loginStep === 1">
              <h3>Sign in to Twitter</h3>
              <button class="btn google-sign">Sign in with Google</button>
              <p class="or"><span>or</span></p>
              <form action="" style="width: 85%">
                <div class="input-form" style="width: 100%">
                  <label class="label-name">Email</label>
                  <input
                    @keyup="
                      verifyEmail ? (emailError = false) : (emailError = true)
                    "
                    ref="email"
                    v-model="email"
                    :class="[emailError ? 'error input-field' : 'input-field']"
                    type="email"
                    placeholder="Email"
                  />
                  <span v-if="emailError" class="errorSpan">
                    Enter a valid email
                  </span>
                </div>
                <div class="next login-next" style="">
                  <button :disabled="!verifyEmail" @click="loginStep = 2">
                    Next
                  </button>
                  <br />
                  <button
                    class="btn forgot-password"
                    style="width: 100%"
                    @click="forgotPassword = true"
                  >
                    Forgot password?
                  </button>
                </div>
              </form>
            </div>
            <div class="single-step middle-flex" v-if="loginStep === 2">
              <h3>Enter your password</h3>
              <p class="p-verify-email">Enter the password for {{ email }}</p>
              <form action="" style="width: 85%">
                <div class="input-form">
                  <label class="label-name">Password</label>
                  <input
                    @keyup="password.length > 0 ? (passwordError = true) : ''"
                    ref="password"
                    v-model="password"
                    :class="[
                      passwordError && !password
                        ? 'error input-field'
                        : 'input-field',
                    ]"
                    type="password"
                    placeholder="Password"
                  />
                  <span v-if="passwordError && !password" class="errorSpan">
                    Enter your password
                  </span>
                </div>
                <br />
                <div class="next">
                  <button :disabled="!password">Next</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div v-if="forgotPassword" class="modal-body">
        <div class="modal-container">
          <div class="header">
            <div @click="forgotPassword = false" class="close-body">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                class="close"
                style="color: rgb(239, 243, 244)"
              >
                <g>
                  <path
                    d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"
                  ></path>
                </g>
              </svg>
            </div>
            <div class="steps">Step {{ forgotPasswordStep }} of 3</div>
          </div>
          <div class="step-container">
            <div class="single-step" v-if="forgotPasswordStep === 1">
              <h3>Find your Twiter account</h3>
              <form action="">
                <div class="input-form">
                  <label class="label-name">Email</label>
                  <input
                    @keyup="
                      verifyEmail ? (emailError = false) : (emailError = true)
                    "
                    ref="email"
                    v-model="email"
                    :class="[emailError ? 'error input-field' : 'input-field']"
                    type="email"
                    placeholder="Email"
                  />
                  <span v-if="emailError" class="errorSpan">
                    Enter a valid email
                  </span>
                </div>
                <div class="next" @click="forgotPasswordStep = 2">
                  <button :disabled="!verifyEmail">Next</button>
                </div>
              </form>
            </div>
            <div class="single-step" v-if="forgotPasswordStep === 2">
              <h3>We sent you a code</h3>
              <p class="p-verify-email">Enter it below to verify {{ email }}</p>
              <form action="">
                <div class="input-form">
                  <label class="label-name">Verification code</label>
                  <input
                    ref="code"
                    v-model="code"
                    class="input-field"
                    type="text"
                    placeholder="Verification code"
                  />
                  <span class="emailNotReceived"> Resend Email? </span>
                </div>
                <div class="next">
                  <button :disabled="!code" @click="forgotPasswordStep = 3">
                    Next
                  </button>
                </div>
              </form>
            </div>
            <div class="single-step" v-if="forgotPasswordStep === 3">
              <h3>Enter your new password</h3>
              <form action="">
                <div class="input-form">
                  <label class="label-name">Password</label>
                  <input
                    @keyup="
                      verifyPassword
                        ? (passwordError = false)
                        : (passwordError = true)
                    "
                    ref="password"
                    v-model="password"
                    :class="[
                      passwordError ? 'error input-field' : 'input-field',
                    ]"
                    type="password"
                    placeholder="Password"
                  />
                  <span v-if="passwordError" class="errorSpan">
                    Password must contain at least one uppercase character, one
                    lowercase character, one number and one symbol?
                  </span>
                </div>
                <br />
                <br />
                <div class="input-form">
                  <label class="label-name">Confirm password</label>
                  <input
                    @keyup="
                      password === confirmPassword
                        ? (confirmPasswordError = false)
                        : (confirmPasswordError = true)
                    "
                    ref="confirmPassword"
                    v-model="confirmPassword"
                    :class="[
                      confirmPasswordError
                        ? 'error input-field'
                        : 'input-field',
                    ]"
                    type="password"
                    placeholder="Confirm password"
                  />
                  <span v-if="confirmPasswordError" class="errorSpan">
                    Confirm your password
                  </span>
                </div>
                <div class="next">
                  <button :disabled="password !== confirmPassword">Next</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="options">
        <span>About</span>
        <span>Help Centre</span>
        <span>Terms of Service</span>
        <span>Privacy Policy</span>
        <span>Cookie Policy</span>
        <span>Accesiblity</span>
        <span>Ads info</span>
        <span>Blog</span>
        <span>Status</span>
        <span>Careers</span>
        <span>Brand Resources</span>
        <span>Advertising</span>
        <span>Marketing</span>
      </div>
      <div class="options">
        <span>Twitter for Business</span>
        <span>Developers</span>
        <span>Directory</span>
        <span>Settings</span>
        <span>© 2022 Twitter</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  data() {
    return {
      showSignUp: false,
      login: false,
      loginStep: 1,
      forgotPasswordStep: 1,
      forgotPassword: true,
      step: 1,
      placeholderName: "Name",
      name: "",
      nameError: false,
      email: "",
      emailError: false,
      month: "",
      monthError: false,
      months: [
        "January",
        "Febuary",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      years: [],
      year: "",
      yearError: false,
      days: [],
      day: "",
      dayError: false,
      code: "",
      confirmPassword: "",
      passwordError: false,
      confirmPasswordError: false,
      password: "",
    };
  },
  computed: {
    verifyEmail() {
      return this.email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    },
    verifyPassword() {
      return this.password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      );
    },
  },
  created() {
    this.getDays();
    this.getYears();
  },
  methods: {
    getDays() {
      this.days = [];
      let no = 31;
      if (this.month === "Febuary") no = 29;
      else if (
        this.month === "September" ||
        this.month === "April" ||
        this.month === "June" ||
        this.month === "November"
      )
        no = 30;
      else no = 31;
      for (let i = 1; i < no + 1; i++) {
        this.days.push(i);
      }
    },
    getYears() {
      const baseyear = 1900;
      const lastYear = new Date().getFullYear();
      this.years = [];
      for (let i = lastYear; i > baseyear; i--) {
        this.years.push(i);
      }
    },
    verification() {},
    async signUp() {
      const date = new Date(this.year, this.month, this.day);
      const data = {
        email: this.email,
        fullName: this.fullName,
        dob: date,
      };
    },
  },
};
</script>
<style scoped>
.container {
  min-height: 100%;
  display: grid;
  grid-template-rows: 6.5fr 0.5fr;
  grid-gap: 0;
  width: 100vw;
}
.main {
  display: grid;
  grid-template-areas: "section hero";
  grid-template-columns: 3fr 2fr;
  grid-template-rows: 1fr;
  color: white;
  height: 90%;
  min-width: 100%;
}
.section {
  background-image: url("~/assets/images/background-twitter.png");
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-area: section;
}
.img-main {
  z-index: 10;
  height: 23rem;
  color: white;
  align-self: center;
  fill: white;
}
.img {
  padding-bottom: 10px;
  height: 3rem;
  color: white;
  align-self: flex-start;
  fill: #d6d9db;
}
.hero {
  padding: 3rem;
  color: #e7e9ea;
  grid-area: hero;
}
h2 {
  font-size: 70px;
  margin: 5rem 0;
  font-weight: 900;
  line-height: 80px;
  letter-spacing: -1.2px;
}
h4 {
  font-size: 29px;
  line-height: 34px;
  font-weight: 900;
}
.btn {
  min-height: 34px;
  width: 320px;
  padding: 0.6rem 0;
  border-radius: 50px;
  font: 14px;
  font-weight: 600;
}
.google-sign {
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  color: rgb(35, 35, 35);
}
.or {
  text-align: center;
  width: 320px;
  padding: 0.5rem 0;
}
.or span {
  padding: 0.5rem;
}
.or::before {
  content: "******************************************************************************************************************************************************************************************************************************************************************************************************************   ";
  height: 1px;
  width: 150px;
  background: rgba(255, 255, 255, 0.133);
  color: rgba(255, 255, 255, 0.133);
  font-size: 1px;
  align-self: center;
}
.or::after {
  content: "******************************************************************************************************************************************************************************************************************************************************************************************************************   ";
  height: 1px;
  width: 150px;
  background: rgba(255, 255, 255, 0.133);
  color: rgba(255, 255, 255, 0.133);
  font-size: 1px;
  align-self: center;
  margin-top: -10px;
}
.email-signup {
  background: #1d9bf0;
  color: white;
}
.tca {
  color: rgb(113, 118, 123);
  font-size: 12px;
  margin-top: 0.5rem;
  width: 350px;
  line-height: 17px;
}
.tca span {
  color: rgb(29, 155, 240);
}
.sign-in {
  margin-top: 6rem;
}
.sign-in h6 {
  font-weight: 600;
  font-size: 18px;
}
.sign-in .btn {
  margin-top: 1rem;
  border: 1px solid rgb(83, 100, 113);
  background-color: transparent;
  color: rgb(29, 155, 240);
}
.footer {
  margin-top: 1.5rem;
  margin-bottom: 0;
}
.options {
  display: flex;
  justify-content: center;
  gap: 1rem;
  color: #71767b;
  font-size: 14px;
  flex-wrap: wrap;
}
.modal-body {
  position: fixed;
  top: 0;
  left: -7%;
  min-height: 100%;
  min-width: 110%;
  background: #23232395;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}
.modal-container {
  width: 40%;
  background: black;
  color: rgb(231, 233, 234);
  padding: 1rem;
  border-radius: 20px;
}
.header {
  display: flex;
  gap: 2rem;
}
.close {
  fill: currentcolor;
  width: 19px;
  height: 19px;
}
.close-body {
  padding: 10px;
}
.close-body:hover {
  background: rgba(255, 255, 255, 0.126);
  /* padding:10px; */
  border-radius: 50%;
}
.steps {
  margin-top: 10px;
  font-size: 18px;
  font-weight: 800;
}
.step-container {
  padding: 1rem 4.5rem;
}
.single-step h3 {
  font-size: 29px;
  font-weight: 800;
  padding: 1rem 0;
}
form {
  padding: 10px 0;
}
.input-form {
  width: 100%;
  border: 1px solid rgba(128, 128, 128, 0.449);
  border-radius: 5px;
  height: 4.2rem;
}
.label-name {
  position: absolute;
  /* display: none; */
  padding: 5px 10px;
  font-size: 14px;
  color: transparent;
  margin-top: -5px;
  transition: all 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
}
.label-name-1 {
  position: absolute;
  /* display: none; */
  padding: 5px 10px;
  font-size: 14px;
  color: #71767b;
  margin-top: -5px;
  transition: all 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
}
.input-form:focus-within .label-name {
  color: rgb(29, 155, 240);
}
.input-form:focus-within .label-name-1 {
  color: rgb(29, 155, 240);
}
.input-field {
  width: 100%;
  height: 100%;
  background: transparent;
  padding: 10px;
  font-size: 15px;
  border-radius: 5px;
  transition: all 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
}
.error {
  border: 1px solid red;
}
.input-field:focus {
  outline: none;
  border: 1px solid rgb(29, 155, 240);
}
.emailNotReceived {
  color: rgb(29, 155, 240);
  font-size: 12px;
}
.input-field:focus::placeholder {
  color: transparent;
}
.dob h4 {
  margin-top: 2rem;
  font-size: 18px;
}
.dob p {
  font-size: 14px;
  color: #71767b;
}
.date-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  gap: 1rem;
}
.month {
  width: 100%;
}
.next {
  margin-top: 6rem;
}
.next button {
  width: 100%;
  background-color: rgb(239, 243, 244);
  border-color: rgba(0, 0, 0, 0);
  border-radius: 50px;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  font-weight: 800;
}
.next button:disabled {
  cursor: not-allowed;
  background-color: rgb(178, 178, 178);
}
.errorSpan {
  margin-top: 5px;
  color: red;
  font-size: 12px;
}
.middle-flex {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.next .forgot-password {
  background: transparent;
  color: white;
  border: 1px solid rgb(178, 178, 178);
}
.login-next {
  width: 100%;
  margin-top: 2rem;
}

.p-verify-email {
  color: #71767b;
  font-size: 12px;
  margin-bottom: 1rem;
  margin-top: -0.5rem;
}
@media screen and (max-width: 950px) {
  .main {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    color: white;
    height: 90vh;
    width: 100vw;
    grid-template-areas:
      " hero"
      "section";
  }
  .hero {
    margin: 0 auto;
  }
}
@media screen and (max-width: 600px) {
  .hero {
    padding: 3rem 2rem;
    margin: 0 auto;
  }
}
</style>