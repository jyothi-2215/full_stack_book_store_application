package business.order;

import api.ApiException;
import business.book.Book;
import business.book.BookDao;
import business.cart.ShoppingCart;
import business.customer.CustomerForm;

import java.time.DateTimeException;
import java.time.YearMonth;
import java.util.Date;

public class DefaultOrderService implements OrderService {

	private BookDao bookDao;

	public void setBookDao(BookDao bookDao) {
		this.bookDao = bookDao;
	}

	@Override
	public OrderDetails getOrderDetails(long orderId) {
		// NOTE: THIS METHOD PROVIDED NEXT PROJECT
		return null;
	}

	@Override
    public long placeOrder(CustomerForm customerForm, ShoppingCart cart) {

		validateCustomer(customerForm);
		validateCart(cart);

		// NOTE: MORE CODE PROVIDED NEXT PROJECT

		return -1;
	}


	private void validateCustomer(CustomerForm customerForm) {

    	String name = customerForm.getName();

		if (name == null || name.equals("")||name.length()<4 || name.length() > 45) {
			throw new ApiException.ValidationFailure("name","Invalid name field");
		}
		String address=customerForm.getAddress();
		if (address == null || address.equals("")||address.length()<4 || address.length() > 45) {
			throw new ApiException.ValidationFailure("address","Invalid address field");
		}
		String phone=customerForm.getPhone();
		if( phone==null)
		{
			throw new ApiException.ValidationFailure("phone","Invalid phone field");
		}
		String phoneDigits= phone.replaceAll("\\D","");
		if(phoneDigits.length()!=10)
		{
			throw new ApiException.ValidationFailure("phone","Invalid phone field");

		}
		String email=customerForm.getEmail();
		if(email==null || email.equals("")||email.length()>100||!email.contains("@")|| email.endsWith(".") ||email.endsWith("@")||email.contains(" "))
		{
			throw new ApiException.ValidationFailure("email", "Invalid email field");
		}
		String ccNumber=customerForm.getCcNumber();
		if(ccNumber == null)
		{
			throw new ApiException.ValidationFailure("ccNumber","Invalid ccNumber field");
		}
		String ccNumberDigitsOnly = ccNumber.replaceAll("[\\s-]", "");

		if (ccNumberDigitsOnly.length() < 14 || ccNumberDigitsOnly.length() > 16) {
			throw new ApiException.ValidationFailure("ccNumber", "Invalid ccNumber field");
		}


		if (expiryDateIsInvalid(customerForm.getCcExpiryMonth(), customerForm.getCcExpiryYear())) {
			throw new ApiException.ValidationFailure("Please enter a valid expiration date");

		}
	}

	private boolean expiryDateIsInvalid(String ccExpiryMonth, String ccExpiryYear) {


		if(ccExpiryMonth == null || ccExpiryYear ==null || ccExpiryMonth.equals("")||ccExpiryYear.equals(""))
		{
			return true;
		}
		int expiryMonth;
		try{
			expiryMonth=Integer.parseInt(ccExpiryMonth);
			if (expiryMonth < 1 || expiryMonth > 12){
				return true;
			}
		}
		catch(NumberFormatException e)
		{
			return true;
		}
		int expiryYear;
		try{
			expiryYear = Integer.parseInt(ccExpiryYear);
		}
		catch(NumberFormatException e)
		{
			return true;
		}
		YearMonth currentYearMonth = YearMonth.now();
		YearMonth expiryYearMonth = YearMonth.of(expiryYear,expiryMonth);
		return expiryYearMonth.isBefore(currentYearMonth);


	}

	private void validateCart(ShoppingCart cart) {


		if (cart.getItems().size() <= 0) {
			throw new ApiException.ValidationFailure("Cart is empty.");
		}

		cart.getItems().forEach(item-> {

			if (item.getQuantity() < 0 || item.getQuantity() > 99) {
				throw new ApiException.ValidationFailure("Invalid quantity");
			}
			Book databaseBook = bookDao.findByBookId(item.getBookId());
			if (databaseBook == null) {
				throw new ApiException.ValidationFailure("Book not found in the database: " + item.getBookId());
			}

			System.out.println(item.getBookForm().getPrice());
			System.out.println(databaseBook.price());
			if (item.getBookForm().getPrice()!=(databaseBook.price())) {
				throw new ApiException.ValidationFailure("Price mismatch for item: " + item.getBookId());
			}

			if (item.getCategoryId()!=databaseBook.categoryId()) {
				throw new ApiException.ValidationFailure("Category mismatch for item: " + item.getBookId());
			}
		});

		throw new ApiException.ValidationFailure("Transactions have not been implemented yet");
	}

}
