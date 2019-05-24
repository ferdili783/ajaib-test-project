
import { createStackNavigator, createAppContainer } from "react-navigation";
import MainScene from './scenes/Main';
import MaximumDiffScene from './scenes/MaximumDiff';
import MergeTwoSortScene from './scenes/MergeTwoSort';
import TransactionBalanceScene from './scenes/TransactionBalance';
import PrintTreeScene from './scenes/PrintTree';

const AppNavigator = createStackNavigator(
    {
      Main: MainScene,
      MaximumDiff: MaximumDiffScene,
      MergeTwoSort: MergeTwoSortScene,
      TransactionBalance: TransactionBalanceScene,
      PrintTree: PrintTreeScene
    },
    {
      initialRouteName: "Main",
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#1F73B7',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    }
);
const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
