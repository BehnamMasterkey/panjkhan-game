using UnityEngine;
using UnityEngine.Purchasing;

public class IAPManager : MonoBehaviour, IStoreListener
{
    public static IAPManager Instance;
    private IStoreController storeController;
    private IExtensionProvider extensionProvider;

    public string productIdLevel5 = "panjkhan.level5";

    void Awake()
    {
        if (Instance == null) { Instance = this; DontDestroyOnLoad(gameObject); }
        else Destroy(gameObject);
    }

    void Start()
    {
        if (storeController == null)
            InitializePurchasing();
    }

    public void InitializePurchasing()
    {
        var builder = ConfigurationBuilder.Instance(StandardPurchasingModule.Instance());
        builder.AddProduct(productIdLevel5, ProductType.NonConsumable);
        UnityPurchasing.Initialize(this, builder);
    }

    public void BuyLevel5()
    {
        if (storeController != null) storeController.InitiatePurchase(productIdLevel5);
    }

    public void OnInitialized(IStoreController controller, IExtensionProvider extensions)
    {
        storeController = controller;
        extensionProvider = extensions;
        Debug.Log("IAP Initialized");
    }

    public void OnInitializeFailed(InitializationFailureReason error) => Debug.LogWarning("IAP init failed: " + error);

    public PurchaseProcessingResult ProcessPurchase(PurchaseEventArgs args)
    {
        if (args.purchasedProduct.definition.id == productIdLevel5)
        {
            PlayerPrefs.SetInt("panjkhan_unlocked_level5", 1);
            Debug.Log("Level 5 unlocked!");
        }
        return PurchaseProcessingResult.Complete;
    }

    public void OnPurchaseFailed(Product product, PurchaseFailureReason failureReason) =>
        Debug.LogWarning($"Purchase failed: {failureReason}");
}