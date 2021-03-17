
import Dashboard from './components/layout/Dashboard';

function App() {

  var head = document.getElementsByTagName('head')[0];
  var insertBefore = head.insertBefore;
  head.insertBefore = function (newElement, referenceElement) {
      if (newElement.href && newElement.href.indexOf('//fonts.googleapis.com/css?family=Roboto') > -1) {
          return;
      }
      insertBefore.call(head, newElement, referenceElement);
  };

  return (
    <div className="App">
      <Dashboard /> 
    </div>
  );
}

export default App;
