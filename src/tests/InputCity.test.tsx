import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputCity, { FormText } from "../components/InputCity";

// useNaviagte()をモック化する
const mockNavigator = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockNavigator,
}));

describe("InputCityコンポーネントのテスト", () => {
  test("テキストフィールドに入力された文字を表示する", () => {
    // 前準備
    const component = render(<InputCity />);
    const textbox = component.getByRole("textbox");
    // 文字を入力する
    userEvent.type(textbox, "東京");
    //検証
    expect(textbox).toHaveValue("東京");
  });

  test("テキストフィールドに文字が入力された状態でEnterキーが押されたとき、画面遷移する", () => {
    // 前準備
    const component = render(<InputCity />);
    const textbox = component.getByRole("textbox");
    // 文字を入力する
    userEvent.type(textbox, `東京{enter}`);
    // 検証
    expect(mockNavigator).toHaveBeenCalledWith("/weather/東京");
  });

  test("テキストフィールドに文字が入力された状態で検索アイコンがクリックされたとき、画面遷移する", () => {
    // 前準備
    const component = render(<InputCity />);
    // 文字を入力する
    userEvent.type(component.getByRole("textbox"), "東京");
    // 検索アイコンをクリックする
    userEvent.click(component.getByRole("button"));
    // 検証
    expect(mockNavigator).toHaveBeenCalledWith("/weather/東京");
  });

  test("テキストフィールドに文字が入力されていない状態でEnterキーが押されたとき、エラーメッセージを表示する", () => {
    // 前準備
    const component = render(<InputCity />);
    // 初期状態の確認
    expect(component.queryByText(FormText.helperText)).not.toBeInTheDocument();
    // Enterキーをクリックする
    userEvent.type(component.getByRole("textbox"), `{enter}`);
    // 検証
    expect(component.getByText(FormText.helperText)).toBeInTheDocument();
    expect(mockNavigator).not.toHaveBeenCalledWith("/weather/東京");
  });

  test("テキストフィールドに文字が入力されていない状態で検索アイコンがクリックされたとき、エラーメッセージを表示する", () => {
    // 前準備
    const component = render(<InputCity />);
    // 初期状態の確認
    expect(component.queryByText(FormText.helperText)).not.toBeInTheDocument();
    // 検索アイコンをクリックする
    userEvent.click(component.getByRole("button"));
    // 検証
    expect(component.getByText(FormText.helperText)).toBeInTheDocument();
    expect(mockNavigator).not.toHaveBeenCalledWith("/weather/東京");
  });
});
