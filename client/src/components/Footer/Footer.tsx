import './footer.css'

const Footer: React.FC = () => {




  return (
    // <footer className="w-100 mt-auto bg-secondary p-4">
      <div className="container-A">
        <div className='otherDiv'>
          Made with{' '}
          <span
            className="emoji"
            role="img"
            aria-label="heart"
            aria-hidden="false"
          >
            ❤️
          </span>{' '}
          by the QwizMe team.
        </div>
        <div className='links-a'>
        <nav><a className='githubLinks' href='https://github.com/RiverStephenson'><img src='https://logos-download.com/wp-content/uploads/2016/09/GitHub_logo.png'></img>River Stephenson</a></nav>
        <nav><a className='githubLinks' href='https://github.com/Bluzke'><img src='https://logos-download.com/wp-content/uploads/2016/09/GitHub_logo.png'></img>Justin Silber</a></nav>
        </div>
      </div>
    // </footer>
  );
};

export default Footer;
