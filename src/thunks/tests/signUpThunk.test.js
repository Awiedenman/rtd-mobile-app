import { hasErrored, isLoading, storeItinerary } from '../../actions';
import signUpThunk from '../signUpThunk';


describe('signUpThunk', () => {
  let mockUrl;
  let mockDispatch;


  beforeEach(() => {
    mockUrl = 'www.mockUrl.com';
    mockDispatch = jest.fn();
  });

  it('calls dispatch with the isLoading action ', () => {
    const thunk = signUpThunk(mockUrl);

    thunk(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(isLoading(true));
  });

  it('should dispatch hasErrored(true) if the response is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false
    }));
    const fetchObject = {
      url: mockUrl,
      options: {}
    };

    const thunk = signUpThunk(fetchObject); 
  
    await thunk(mockDispatch);
  
    expect(mockDispatch).toHaveBeenCalledWith(({"isLoading": true, "type": "IS_LOADING"}));
    expect(mockDispatch).not.toHaveBeenCalledWith(isLoading(false));
  });

  it('should dispatch isLoading(false) if the response is ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true
    }));
  
    const thunk = signUpThunk(mockUrl); 
  
    await thunk(mockDispatch);
  
    expect(mockDispatch).toHaveBeenCalledWith(isLoading(false));
  });

  it('should dispatch storeItinerary with the correct param', async () => {
    const mockUser = {

    };

    window.fetch = jest.fn().mockImplpementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        mockUser
      })
    }));

    const thunk = signUpThunk(mockUrl);

    await thunk(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(signUpUser(mockUser));
  });
});
